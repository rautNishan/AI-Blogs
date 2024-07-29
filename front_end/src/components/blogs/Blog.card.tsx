import { useNavigate } from "react-router-dom";
import BlogCardStyle from "./Blog.card.module.css";

export interface IBlogCardProps {
  id: string | number;
  imgUrl: string;
  title: string;
  subTitle: string;
  tags: string[];
}

export function BlogCard(props: IBlogCardProps) {
  const navigate = useNavigate();

  function HandleClickOnDiv() {
    navigate(`/blog-details/${props.id}`);
  }
  return (
    <div onClick={HandleClickOnDiv} className={BlogCardStyle.blog}>
      <img className={BlogCardStyle.img} src={props.imgUrl} alt="Blog Image" />
      <div className={BlogCardStyle.tags}>
        {props.tags.map((tag) => (
          <span>{tag}</span>
        ))}
      </div>
      <div className={BlogCardStyle.title}>
        <p>{props.title}</p>
      </div>
      <div className={BlogCardStyle.shortDescription}>
        <p>{props.subTitle}</p>
      </div>
    </div>
  );
}
