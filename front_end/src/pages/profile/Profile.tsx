import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../common/constants/backend.base.url";
import { AuthContext } from "../../common/context/auth.context";
import { BlogCard } from "../../components/blogs/Blog.card";
import Button from "../../components/common/button/Button";
import ButtonStyle from "../../components/common/button/Button.module.css";
import ProfileStyle from "./Profile.module.css";
import { BASE_BLOG_IMAGE_PATH } from "../../common/constants/backend-image-path.constant";
interface IProfile {
  id: number | string | null;
  email: string | null;
  userName: string | null;
}

interface IPaginationInfo {
  pageNumber: number;
  limit: number;
  totalData: number;
}

interface IPhoto {
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

interface IBlogInfo {
  id: string | number;
  title: string;
  subTitle: string;
  userId: string | number;
  tags: string[];
  photos: IPhoto[];
}
export function Profile() {
  const navigate = useNavigate();

  const { setAuthenticated } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState<IProfile | null>(null);
  const [paginationInfo, setPaginationInfo] = useState<IPaginationInfo | null>(
    null
  );

  console.log("This is Pagination Info: ", paginationInfo);

  const [blogs, setBlogs] = useState<IBlogInfo[] | []>([]);

  const token = localStorage.getItem("token");

  //Function to Handle Logout
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  };

  //Fetch UserInformation
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/user/auth-me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserInfo(response.data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setAuthenticated(false);
            localStorage.removeItem("token");
            alert("Token Expired");
            navigate("/login");
          }
        }
      }
    };

    //Fetch Blog of the User
    const fetchUserBlog = async () => {
      const userBlogListResponse = await axios.get(
        `${BACKEND_BASE_URL}/user/blog/list`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const incomingBlogList: {
        _pagination: IPaginationInfo;
        data: IBlogInfo[] | [];
      } = userBlogListResponse.data.data;

      const paginationInfo: IPaginationInfo = incomingBlogList._pagination;
      const blogList: IBlogInfo[] | [] = incomingBlogList.data;
      setPaginationInfo(paginationInfo);
      setBlogs(blogList);
    };

    fetchUserProfile();
    fetchUserBlog();
  }, [token, setAuthenticated, navigate]);

  return (
    <div className={ProfileStyle.mainProfile}>
      <div className={ProfileStyle.profileInfoSection}>
        <span>
          <h1>Hi {userInfo?.userName} Welcome Back</h1>
          <Link className={ProfileStyle.link} to="/add-blog">
            Create a New Blog
          </Link>
        </span>
      </div>
      <div className={ProfileStyle.blogs}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              title={blog.title}
              imgUrl={`${BASE_BLOG_IMAGE_PATH}${blog.photos[0].fileName}`}
              subTitle={blog.subTitle}
              tags={blog.tags}
            />
          ))
        ) : (
          <h1>There is no blog for the current user</h1>
        )}
      </div>

      <Button className={ButtonStyle.logOutButton} onClick={handleLogOut}>
        Log Out
      </Button>
    </div>
  );
}
