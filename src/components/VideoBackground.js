import React, { useState, useEffect, useRef } from "react";
import { get } from "lodash";

const VideoBackground = ({ videoMp4, videoWebM, videoImage }) => {
  return (
    <div className="-z-1 bg-cover bg-bottom w-full h-screen flex items-center overflow-hidden fixed bg-gradient-to-t from-blue-400 to-green-500">
      <video
        autoPlay
        muted
        loop
        className="flex-1 h-screen w-full md:flex relative z-10 object-cover object-center"
      >
        <source src={videoMp4} type="video/mp4" />
        <source src={videoWebM} type='video/webm; codecs="vp8, vorbis"' />
        <img src={videoImage} title="Your browser does not support the video"></img>
      </video>
    </div>
  );
};

export default VideoBackground;
