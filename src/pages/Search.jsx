import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchMovies, getMoreResults } from "../redux/actions/search.action";

import MovieCard from "../components/movie-card/MovieCard";

const Search = ({
  searchMovies,
  getMoreResults,
  list: { hasMore, movies, loading },
}) => {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

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

  // Populate data with infinite scrolling
  useEffect(() => {
    if (page > 1) {
      getMoreResults(title, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  let movieList = [];
  movies ? (movieList = movies) : (movieList = []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      setPage(1);
      searchMovies(title);
    }
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
          <button data-testid="search-button" className="search-submit" type="submit">
            Search
          </button>
        </form>
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
