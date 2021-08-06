import React from "react";

const ImageModal = ({ image, setModal }) => {
  return (
    <div className="modal-container" onClick={(e) => setModal(false)}>
      <img className="image-modal" src={image} alt="Movie Poster" />
    </div>
  );
};

export default ImageModal;
