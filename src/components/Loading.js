//This page creates a fancy little loading animation when a new page is toggled
import React from "react";

import './Loading.css';

/**
 * An async function that when called
 * @returns a bouncing loading animation
 */
const Loading = () => {
  return (
    <div className='anim-jump-container'>
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
}

//export loading
export default Loading;
