import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { searchMovies, getMoreResults } from "../redux/actions/search.action";

import MovieCard from "../components/movie-card/MovieCard";

const Search = ({
  searchMovies,
  getMoreResults,
  list: { hasMore, movies, loading },
}) => {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const observer = useRef();
  const lastMovieElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );
  console.log(page);
  // Populate suggestion for auto-complete
  useEffect(() => {
    if (title === "") {
      setSuggestion([]);
    }
    if (title.length > 3) {
      let cancel;
      axios({
        method: "GET",
        url: `http://www.omdbapi.com/?apikey=2a818054&s=${title}`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          res.data.Search ? setSuggestion(res.data.Search) : setSuggestion([]);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }

    if (suggestion.length > 0) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  // Populate data with infinite scrolling
  useEffect(() => {
    if (page > 1) {
      console.log("running");
      getMoreResults(title, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  let movieList = [];
  movies ? (movieList = movies) : (movieList = []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    searchMovies(title);
    setSuggestion([]);
    setShowSuggestion(false);
  };

  return (
    <div className="search-container">
      <h1>Find a Movie</h1>
      <div className="form-group">
        <form className="search-form" onSubmit={(e) => onSubmit(e)}>
          <input
            className="search-bar"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter a Movie Title..."
          />
          <button className="search-submit" type="submit">
            Search
          </button>
        </form>
        {showSuggestion ? (
          <div className="suggestion-container">
            <ul>
              {suggestion.map((movie, index) => (
                <Link to={`/detail/${movie.imdbID}`}>
                  <li key={index}>{movie.Title}</li>
                </Link>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div>
        {movieList.length > 0 ? (
          movieList.map((movie, index) => {
            if (movieList.length === index + 1) {
              return (
                <div
                  className="card-container"
                  ref={lastMovieElement}
                  key={index + movie.Title}
                >
                  <MovieCard movie={movie} />
                </div>
              );
            } else {
              return (
                <div className="card-container" key={index + movie.Title}>
                  <MovieCard movie={movie} />
                </div>
              );
            }
          })
        ) : (
          <div>
            <h1>No Movies</h1>
            <h2>Search movies to display</h2>
          </div>
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  list: PropTypes.object.isRequired,
  searchMovies: PropTypes.func.isRequired,
  getMoreResults: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.searchRes,
});

export default connect(mapStateToProps, { searchMovies, getMoreResults })(
  Search
);
