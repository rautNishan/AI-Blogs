import { useParams } from "react-router-dom";
import BlogDetailStyle from "./Blog.details.module.css";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../common/constants/backend.base.url";
import { BASE_BLOG_IMAGE_PATH } from "../../common/constants/backend-image-path.constant";

export interface IPhoto {
  associatedType: string | null;
  associationId: string | null;
  createdAt: string | null;
  deletedAt: null;
  description: null;
  fileName: string | null;
  id: string | null;
  mime: string | null;
  path: string | null;
  size: string | null;
  updatedAt: string | null;
}
export interface IBlog {
  title: string;
  subTitle: string;
  description: string;
  imageName: string | null;
  photos: IPhoto[];
  tags: string[];
}

export function BlogDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [blog, setBlog] = useState<IBlog | null>(null);

  useEffect(() => {
    const fetchBlogGetById = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/user/blog/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const resData = await response.json();
          setBlog(resData.data);
        }
      } catch (error) {
        console.log("This is Error: ", error);
      }
    };

    fetchBlogGetById();
  }, [id, token]);
  console.log("This is Blog: ", blog);

  return (
    <div className={BlogDetailStyle.mainDiv}>
      <div className={BlogDetailStyle.title}>{blog?.title}</div>
      <div className={BlogDetailStyle.subTitle}>{blog?.subTitle}</div>
      <img
        className={BlogDetailStyle.image}
        src={`${BASE_BLOG_IMAGE_PATH}${blog?.photos[0].fileName}`}
      />
      <div className={BlogDetailStyle.description}>{blog?.description}</div>
    </div>
  );
}
