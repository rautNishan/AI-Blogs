import { useContext, useEffect } from "react";
import BlogAddStyle from "./Blog.add.module.css";
import { AuthContext } from "../../common/context/auth.context";
import { useNavigate } from "react-router-dom";
export function BlogAddPage() {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  });

  return (
    <>
      <div className={BlogAddStyle.blogAddMainPage}>
        <h1>Add Your Blog Here</h1>
        <div className={BlogAddStyle.addBlogFrom}>
          <div className={BlogAddStyle.formsGroupSection}>
            <label>Blog title</label>
            <input type="text" />
            <label>Blog Subtitle</label>
            <input type="text" />
            <label>Tags</label>
            <input type="text" />
          </div>
          <div className={BlogAddStyle.description}>
            <label>Description</label>
            <textarea />
          </div>
          <div className={BlogAddStyle.image}>
            <label>Image</label>
          </div>
        </div>
      </div>
    </>
  );
}
