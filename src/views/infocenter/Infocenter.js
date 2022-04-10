import React from "react";

import VideoBackground from "components/VideoBackground";
import Character from "components/characters/CharacterWrapper";
import { PageTitle } from "components/PageTitle";

import videoImage from "assets/locations/Infocenter.jpg";
import videoMp4 from "assets/locations/Infocenter.mp4";
import videoWebM from "assets/locations/Infocenter.webm";
import { InfocenterContent } from "./InfocenterContent";

export const Infocenter = () => {
  return (
    <>
      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />
      <Character name="janet" />
      <div className="absolute left-8 top-7">
        <PageTitle title="Infocenter" />
      </div>
      <InfocenterContent />
    </>
  );
};
