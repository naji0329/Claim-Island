import React from "react";
import { useLocalStorage } from "react-use";

import { IS_LITE_VERSION } from "constants/ui";

const VideoBackground = ({ videoMp4, videoWebM, videoImage }) => {
  const [isLiteVersion] = useLocalStorage(IS_LITE_VERSION);

  return (
    <div className="-z-1 w-full h-screen flex items-center overflow-hidden fixed bg-gradient-to-t from-blue-400 to-green-500">
      {isLiteVersion ? (
        <img
          className="flex-1 h-screen w-full md:flex relative z-10 object-cover object-center"
          src={videoImage}
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          className="flex-1 h-screen w-full md:flex relative z-10 object-cover object-center"
        >
          <source src={videoMp4} type="video/mp4" />
          <source src={videoWebM} type='video/webm; codecs="vp8, vorbis"' />
        </video>
      )}
    </div>
  );
};

export default VideoBackground;
