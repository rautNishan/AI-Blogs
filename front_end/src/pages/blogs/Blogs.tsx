import { BlogCard } from "../../components/blogs/Blog.card";
import BlogsStyle from './Blog.module.css'
export default function Blogs() {
  const imgUrl = "ai.png";
  return (
    <div className={BlogsStyle.blogs}>
      {/* <h1>This is Blogs</h1> */}
      <BlogCard
        imgUrl={imgUrl}
        title="How AI is changing the world"
        shortDescription="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
         <BlogCard
        imgUrl={imgUrl}
        title="How AI is changing the world"
        shortDescription="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
         <BlogCard
        imgUrl={imgUrl}
        title="How AI is changing the world"
        shortDescription="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
         <BlogCard
        imgUrl={imgUrl}
        title="How AI is changing the world"
        shortDescription="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
    </div>
  );
}
