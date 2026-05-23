import PostCard from "../Components/PostCard";
import { fetchHomePagePosts } from "../server/fetchPosts";
import { useState, useEffect } from "react";
import CreatePostBar from "../Components/Partials/CreatePostBar";
import SideBox from "../Components/Partials/SideBox";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { pageNo, setPageNo } = useOutletContext();
  const [isNext, setisNext] = useState(true);

  // Fetching Homepage Posts
  useEffect(() => {
    fetchHomePagePosts(pageNo, setPosts, setisNext);
  }, [pageNo]);

  return (
    <>
      <div className="flex flex-row justify-between items-center mx-14">
        <SideBox />
        <CreatePostBar />
      </div>

      <div
        id="post-container"
        className="position-relative mt-5 mx-14 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-center"
      >
        {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
      
      <div>
        {pageNo > 1 && (
          <input
            type="button"
            className="secondary-button m-auto mt-10 px-5 mx-2"
            onClick={() => {
              setPageNo((prev) => prev - 1);
            }}
            value="..Prev"
          />
        )}
        {isNext && (
          <input
            type="button"
            className="secondary-button m-auto mt-10 px-5 mx-2"
            onClick={() => {
              setPageNo((prev) => prev + 1);
            }}
            value="Next.."
          />
        )}
      </div>
    </>
  );
};

export default Home;
