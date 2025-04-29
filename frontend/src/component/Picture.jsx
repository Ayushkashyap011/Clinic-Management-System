import React from 'react';
import './Picture.css';
import Picture from "../assets/image/Picture.jpg";

const Image = () => {
  return (
    <img className='Image' src={Picture} alt="background" />
  );
};

export default Image;
