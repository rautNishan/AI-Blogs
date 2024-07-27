import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_BLOG_IMAGE_PATH } from "../../common/constants/backend-image-path.constant";
import { BACKEND_BASE_URL } from "../../common/constants/backend.base.url";
import { AuthContext } from "../../common/context/auth.context";
import BlogAddStyle from "./Blog.add.module.css";

export interface IUploadImage {
  path: string;

  fileName: string;

  mime: string;

  size?: number;

  description?: string | null;
}

export interface IBlog {
  title: string;
  subTitle: string;
  description: string;
  imageName: string | null;
  tags: string[];
}

export function BlogAddPage() {
  const token = localStorage.getItem("token");
  const { authenticated, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  useEffect(() => {
    if (!authenticated && !isLoading) {
      navigate("/login");
    }
  });

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `${BACKEND_BASE_URL}/user/file/upload/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const uploadResponseData: IUploadImage = response.data.data;
        setFileName(uploadResponseData.fileName);
        setSelectedImage(BASE_BLOG_IMAGE_PATH + uploadResponseData.fileName);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleRemoveImage = async () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    try {
      const response = await axios.delete(
        BACKEND_BASE_URL + `/user/file/delete/${fileName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("This is Response: ", response.data);
    } catch (error) {
      console.log("This is Error: ", error);
    }
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tagArr: string[] = [];
    tagArr.push(tags);

    //prepare data to send to backend
    const dataToSend: IBlog = {
      title: title,
      subTitle: subTitle,
      description: description,
      tags: tagArr,
      imageName: fileName,
    };
    console.log("This is data to send: ", dataToSend);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/user/blog/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      console.log("This is Response: ", response);
      if (response.ok) {
        const resData = response.json();
        console.log("This is ResData: ", resData);
      }
    } catch (error) {
      console.log("This is Error: ", error);
    }
    // const
  };

  return (
    <>
      <div className={BlogAddStyle.blogAddMainPage}>
        <h1>Add Your Blog Here</h1>
        <form
          onSubmit={(e) => handleSubmitForm(e)}
          className={BlogAddStyle.addBlogFrom}
        >
          <div className={BlogAddStyle.addBlogLeftSide}>
            <div className={BlogAddStyle.formsGroupSection}>
              <label>Blog title</label>
              <input type="text" onChange={(e) => setTitle(e.target.value)} />
              <label>Blog Subtitle</label>
              <input
                type="text"
                onChange={(e) => setSubTitle(e.target.value)}
              />
              <label>Tags</label>
              <input type="text" onChange={(e) => setTags(e.target.value)} />
            </div>

            <div className={BlogAddStyle.image}>
              <div className={BlogAddStyle.labelWrapper}>
                <label>Image</label>
              </div>
              {selectedImage ? (
                <div className={BlogAddStyle.addImage}>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className={BlogAddStyle.previewImage}
                  />
                  <button
                    className={BlogAddStyle.removeButton}
                    onClick={handleRemoveImage}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className={BlogAddStyle.addImage}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button
                    className={BlogAddStyle.plusSign}
                    onClick={handleButtonClick}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={BlogAddStyle.description}>
            <label>Description</label>
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <button className={BlogAddStyle.submitButton}>Add Blog</button>
        </form>
      </div>
    </>
  );
}
