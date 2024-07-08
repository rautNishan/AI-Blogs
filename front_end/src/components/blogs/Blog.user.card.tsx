import BlogUserCardStyle from "./Blog.user.card.module.css";
import Button from "../common/button/Button";
import ButtonStyle from "../../components/common/button/Button.module.css";

export interface BlogInformation {
  blogTitle: string;
  blogSubTitle: string;
}
export function BlogUserRelatedCard(blogInformation: BlogInformation) {
  return (
    <div className={BlogUserCardStyle.userBlogs}>
      <div className={BlogUserCardStyle.userBlogInfo}>
        <h2>{blogInformation.blogTitle}</h2>
        <h3>{blogInformation.blogSubTitle}</h3>
      </div>
      <div className={BlogUserCardStyle.groupButton}>
        <Button className={ButtonStyle.viewUserBlogButton}>View</Button>
        <Button className={ButtonStyle.editUserBlogButton}>Edit</Button>
        <Button className={ButtonStyle.deleteUserBlogButton}>Delete</Button>
      </div>
    </div>
  );
}
