import { useContext, useEffect, useRef, useState } from "react";
import BlogAddStyle from "./Blog.add.module.css";
import { AuthContext } from "../../common/context/auth.context";
import { useNavigate } from "react-router-dom";

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
