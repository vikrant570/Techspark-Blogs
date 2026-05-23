import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const PostCard = ({ post }) => {
  const { setCategorySearch } = useOutletContext();
  return (
    <div className="post-card rounded-xl p-4 justify-self-center shadow-slate-700 shadow-md hover:shadow-xl hover:shadow-slate-300 ease-in-out duration-300 cursor-pointer w-full text-left">
      <div className="relative w-full h-80 overflow-hidden rounded-md z-0">
        <img
          src={`${post.banner}`}
          className="w-full h-full object-cover transition-opacity duration-300 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="flex flex-row justify-between items-start p-2">
        {/* Left Column: Title, Subject, and Regards (Takes 75% width) */}
        <div className="flex flex-col w-3/4 pr-4 justify-between min-h-28">
          {/* Title and Subject Area (Fixed Max Height) */}
          <div>
            {/* Title: Set explicit max lines via a constrained height/line-clamp if possible, 
                or rely on text-ellipsis, but use h-max to avoid growing/shrinking due to text. */}
            <h2 className="text-xl font-medium md:text-2xl min-h-12 max-h-16 overflow-hidden">
              {post.title}
            </h2>
            {/* Subject: Fixed to one line, ensuring a stable height. */}
            <p className="text-slate-500 italic text-ellipsis line-clamp-1 w-full mt-1">
              {post.subject}
            </p>
          </div>

          {/* Author/Regards Area (Stable content) */}
          <p className="mt-3 text-sm">
            <b>{post.regards.name}</b>
            <br />
            <span className="text-slate-500">({post.regards.email})</span>
          </p>
        </div>

        {/* Right Column: Category and View Post Button (Takes 25% width) */}
        <div className="flex flex-col w-1/4 justify-between items-end min-h-28">
          {/* Category Link */}
          <Link
            to={`/categorized?category=${encodeURIComponent(post.category)}`}
            className="font-bold text-slate-600 hover:underline ease-in-out duration-200 underline-offset-2 hover:text-slate-900 text-right text-sm whitespace-nowrap overflow-hidden text-ellipsis"
            onClick={() => {
              setCategorySearch(post.category);
            }}
          >
            {post.category}
          </Link>

          {/* View Post Link/Button (Explicit width for stability) */}
          <Link
            to={`/${post._id}`}
            className="secondary-button text-center mt-4 w-24"
          >
            View Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
