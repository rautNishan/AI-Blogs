import { useParams } from "react-router-dom";
import BlogDetailStyle from "./Blog.details.module.css";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../common/constants/backend.base.url";

export interface IBlog {
  title: string;
  subTitle: string;
  description: string;
  imageName: string | null;
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

  return (
    <div className={BlogDetailStyle.mainDiv}>
      <h1>{blog?.title}</h1>
      <h2>{blog?.subTitle}</h2>
      <h2>{blog?.description}</h2>
    </div>
  );
}
