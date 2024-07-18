import { useContext, useEffect, useRef, useState } from "react";
import BlogAddStyle from "./Blog.add.module.css";
import { AuthContext } from "../../common/context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_BLOG_IMAGE_PATH } from "../../common/constants/backend-image-path.constant";
import { BACKEND_BASE_URL } from "../../common/constants/backend.base.url";

export function BlogAddPage() {
  const token = localStorage.getItem("token");
  const { authenticated, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

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
          "http://localhost:3000/user/file/upload/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFileName(response.data.data.fileName);
        setSelectedImage(BASE_BLOG_IMAGE_PATH + response.data.data.fileName);
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
    console.log("This is Selected Value: ", fileName);
    try {
      const response = await axios.delete(
        BACKEND_BASE_URL + `/user/file/delete/${fileName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("This is Response: ", response);
    } catch (error) {
      console.log("This is Error: ", error);
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              <input type="text" />
              <label>Blog Subtitle</label>
              <input type="text" />
              <label>Tags</label>
              <input type="text" />
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
            <textarea />
          </div>
        </form>
      </div>
    </>
  );
}
