import { Link } from "react-router-dom";

const SearchBarDropDown = ({ terms, setIsSearching }) => {
  return (
    <div className="z-50 absolute right-6 top-24 w-1/5">
      <ul className="text-left text-sm">
        {terms &&
          terms.map((term, index) => {
            return (
              <li
                key={index}
                className="text-left bg-gray-100 hover:bg-gray-200 ease-in-out duration-200 cursor-auto p-3"
              >
                <Link to={`/categorized?term=${encodeURIComponent(term)}`} onClick={()=>{setIsSearching(false)}}>
                  <p className="text-sm">{term}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchBarDropDown;
