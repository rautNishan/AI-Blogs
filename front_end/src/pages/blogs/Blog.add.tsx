import { useContext, useEffect, useRef, useState } from "react";
import BlogAddStyle from "./Blog.add.module.css";
import { AuthContext } from "../../common/context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_BLOG_IMAGE_PATH } from "../../common/constants/backend-image-path.constant";

export function BlogAddPage() {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!authenticated) {
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
            },
          }
        );
        console.log("This is Response: ", response.data.data);
        console.log(
          "Search For an Image",
          BASE_BLOG_IMAGE_PATH + response.data.data.fileName
        );
        setSelectedImage(BASE_BLOG_IMAGE_PATH + response.data.data.fileName);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className={BlogAddStyle.blogAddMainPage}>
        <h1>Add Your Blog Here</h1>
        <div className={BlogAddStyle.addBlogFrom}>
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
        </div>
      </div>
    </>
  );
}
