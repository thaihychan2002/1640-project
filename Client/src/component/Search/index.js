import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Search.css";
export default function Search() {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText");
    if (savedSearchText) {
      setSearchText(savedSearchText);
    }
  }, []);

  const navigate = useNavigate();
  const onChange = (e) => {
    e.preventDefault();
    localStorage.setItem("searchText", searchText);
    navigate(`/search/${searchText}`);
  };
  return (
    <div>
      {" "}
      <form className="form" style={{ width: "90%", marginBottom: 25 }}>
        <button onClick={onChange}>
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <input
          className="input"
          placeholder="Search any idea"
          type="text"
          id="input"
          onChange={(e) => setSearchText(e.target.value)}
          autoComplete="off"
        />
        <button className="reset" type="reset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
