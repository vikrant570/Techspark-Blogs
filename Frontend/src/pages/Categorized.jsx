import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import SideBox from "../Components/Partials/SideBox";
import CreatePostBar from "../Components/Partials/CreatePostBar";
import { fetchByCategory, fetchByTerm } from "../server/fetchPosts";
import { useSearchParams } from "react-router-dom";

const Categorized = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState();
  const category = searchParams.get("category");
  const term = searchParams.get("term");

  useEffect(() => {
      const fetchData = async () => {
        let data;
        if (category && category !== ""){
          data = await fetchByCategory(category);
          setPosts(data.posts);
        } else if (term && term !==""){
          data = await fetchByTerm(term);
          setPosts(data.posts)
        }
      };
      fetchData();
  }, [category, term]);

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
        <input
          type="button"
          value="Load More.."
          className="secondary-button m-auto mt-10 px-5 mx-2"
        />
      </div>
    </>
  );
};

export default Categorized;
