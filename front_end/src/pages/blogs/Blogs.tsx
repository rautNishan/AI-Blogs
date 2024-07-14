import { BlogCard } from "../../components/blogs/Blog.card";
import BlogsStyle from "./Blog.module.css";
export default function Blogs() {
  const imgUrl = "ai.png";
  const img2 = "1715241443604_10.jpg";
  const img3 = "1715242436354_ales-nesetril-Im7lZjxeLhg-unsplash-min.jpg";
  const img4 = "1715242760932_alexander-awerin-uG4PHgHwAfM-unsplash-min.jpg";
  const img5 = "1715242898843_brooke-lark-nTZOILVZuOg-unsplash-min.jpg";
  const img6 = "1715245418992_camilo-fierro-z7rcwqCi77s-unsplash-min.jpg";
  return (
    <div className={BlogsStyle.blogs}>
      <BlogCard
        imgUrl={imgUrl}
        title="How AI is changing the world"
        subTitle="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
      <BlogCard
        imgUrl={img2}
        title="How AI is changing the world"
        subTitle="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
      <BlogCard
        imgUrl={img3}
        title="How AI is changing the world"
        subTitle="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
      <BlogCard
        imgUrl={img4}
        title="How AI is changing the world"
        subTitle="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
      <BlogCard
        imgUrl={img5}
        title="How AI is changing the world"
        subTitle="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
      <BlogCard
        imgUrl={img6}
        title="How AI is changing the world"
        subTitle="This is Short description about ai. How world is changing to its current direction"
        tags={["Artificial Intelligence", "Technology", "AI"]}
      />
    </div>
  );
}
