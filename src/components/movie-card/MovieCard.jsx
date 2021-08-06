import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageModal from "../image-modal/ImageModal";

const MovieCard = ({ movie: { Title, Year, imdbID, Poster } }) => {
  const [modal, setModal] = useState(false);
  return (
    <div className="movie-container">
      {modal ? <ImageModal image={Poster} setModal={setModal} /> : null}
      <img
        src={Poster}
        alt="Movie Poster"
        className="poster"
        onClick={(e) => setModal(true)}
      />
      <h3 className="movie-title">
        <Link to={`/detail/${imdbID}`}>{Title}</Link>
      </h3>
      <h4 className="movie-year">{Year}</h4>
    </div>
  );
};

export default MovieCard;
