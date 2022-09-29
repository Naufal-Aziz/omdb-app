import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=1aa1c0a0";



const App = () => {
  const theme = localStorage.getItem('theme')

  let [stateTheme, setStateTheme] = useState(theme)

  let [movieList, setMovieList] = useState([]);

  let [page, setPage] = useState(1);

  let [keyword, setKeyword] = useState("");

  const themeSwitch = () => {
    console.log(stateTheme)
    if (!stateTheme || stateTheme == "light") {
      setStateTheme('dark')
      localStorage.setItem("theme", "dark");
    } else {
      setStateTheme('light')
      localStorage.setItem("theme", "light");
    }
  };

  const searchMovies = async (title) => {
    const response = await axios.get(`${API_URL}&s=${title}&page=${page}`);

    setMovieList(response.data.Search);
  };

  useEffect(() => {
    searchMovies(keyword);
  }, [page]);

  useEffect(() => {}, [stateTheme]);

  return (
    <div
      className="App"
      style={
        stateTheme == "dark" ? { backgroundColor: "black", color: "white" } : {}
      }
    >
      <button onClick={themeSwitch}>
        {stateTheme == "dark" ? "GO LIGHT" : "GO DARK"}
      </button>
      <h1>Hello, {keyword}!</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          searchMovies(keyword);
        }}
      >
        SEARCH
      </button>
      <ul className="movie-list">
        {movieList && movieList.length > 0 ? (
          <>
            {movieList.map((item, index) => (
              <li key={index}>
                <h3>{item.Title}</h3>
                <img
                  src={
                    item.Poster !== "N/A"
                      ? item.Poster
                      : "https://dummyimage.com/300x400/000/ffffff&text=No+Poster"
                  }
                  alt=""
                />
                <div className="movie-detail">
                  <p>Type : {item.Type}</p>
                  <p>Year : {item.Year}</p>
                </div>
              </li>
            ))}
          </>
        ) : (
          <li> ajos </li>
        )}
      </ul>
      <button
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev page
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next Page
      </button>
    </div>
  );
};

export default App;
