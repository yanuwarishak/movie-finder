import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getMovieDetails,
  clearDetailPage,
} from "../redux/actions/movie.action";
import { Link } from "react-router-dom";

const Detail = ({
  match,
  getMovieDetails,
  clearDetailPage,
  movie: { movie },
}) => {
  console.log(movie);
  useEffect(() => {
    getMovieDetails(match.params.id);
    return () => {
      clearDetailPage();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search-container">
      <h1>{movie.Title}</h1>
      <h2>{movie.Year}</h2>
      <p>{movie.Plot}</p>
      <img src={movie.Poster} alt="" />
      <Link to="/">Back to Search</Link>
    </div>
  );
};

Detail.propTypes = {
  getMovieDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
});

export default connect(mapStateToProps, { getMovieDetails, clearDetailPage })(
  Detail
);
