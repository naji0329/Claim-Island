import React, { useState, useEffect, useRef } from "react";
import { get } from "lodash";

const VideoBackground = ({ videoImage }) => {
  const [newHeight, setNewHeight] = useState("100%");
  const videoContainer = useRef(null);
  const video = useRef(null);

  const margin = 1.1; // add 10%
  const min_w = 1100;

  //   const scrollHeight = document.documentElement.scrollHeight;
  const H1 = document.documentElement.scrollHeight;

  useEffect(() => {
    const H2 = videoContainer.current.parentElement.clientHeight;
    const H = Math.max(H1, H2);
    console.log({ H, H1, H2 });

    const vid_w_orig = parseInt(video.current.clientWidth);
    const vid_h_orig = parseInt(video.current.clientHeight);

    const container_w = parseInt(document.documentElement.scrollWidth);
    const container_h = parseInt(H);

    var scale_h = container_w / vid_w_orig;
    var scale_v = container_h / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    if (scale * vid_w_orig < min_w) {
      scale = min_w / vid_w_orig;
    }

    // const newWidth = scale * vid_w_orig;
    const nH = parseInt(scale * vid_h_orig); // *margin
    // setNewHeight(`${nH}px`);
    console.log("style ", {
      container_h,
      nH,
    });
  }, [video, videoContainer]);

  return (
    //   CURRENTLY IS DISABLED AUTO SIZED
    <div
      className="video-container"
      ref={videoContainer}
      //   style={{ height: newHeight }}
    >
      {console.log("render", { H1 })}
      <video autoPlay muted loop ref={video}>
        <source
          src={process.env.PUBLIC_URL + "/location_vids/bank_animated.mp4"}
          type="video/mp4"
        />
        <source
          src={process.env.PUBLIC_URL + "/location_vids/bank_webm.webm"}
          type='video/webm; codecs="vp8, vorbis"'
        />
        <img
          src={videoImage}
          title="Your browser does not support the video"
        ></img>
      </video>
    </div>
  );
};

export default VideoBackground;
