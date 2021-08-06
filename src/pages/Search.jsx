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

  useEffect(() => {
    if (page > 1) {
      getMoreResults(title, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMoreResults, page]);

  let movieList = [];
  movies ? (movieList = movies) : (movieList = []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    searchMovies(title);
  };

  return (
    <div>
      <div className="form-group">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              type="text"
              placeholder="Enter a Movie Title..."
            />
          </div>
          <div>
            <button type="submit">Search</button>
          </div>
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
          <h1>No movies</h1>
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
