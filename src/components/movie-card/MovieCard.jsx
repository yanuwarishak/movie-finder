import React from "react";

const MovieCard = ({ movie: { Title, Year, imdbID, Poster } }) => {
  return (
    <div>
      <img src={Poster} alt="Movie Poster" className="poster" />
      <h3 className="title">{Title}</h3>
      <h4 className="year">{Year}</h4>
    </div>
  );
};

export default MovieCard;
