import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "../../components/Accordion";
import { get } from "lodash";

import { Pearl3DView } from "../../components/pearl3DView";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const calculateGrade = (grade) => {
  const totalGradePossible = 300;

  if (grade >= 0.95 * totalGradePossible) {
    return "AAA";
  } else if (grade >= 0.9 * totalGradePossible) {
    return "AA+";
  } else if (grade >= 0.8 * totalGradePossible) {
    return "AA";
  } else if (grade >= 0.7 * totalGradePossible) {
    return "A";
  } else if (grade >= 0.6 * totalGradePossible) {
    return "B";
  } else if (grade >= 0.5 * totalGradePossible) {
    return "C";
  } else {
    return "D";
  }
};

const calculateSize = (size) => {
  if (size >= 90) {
    return "XXL";
  } else if (size >= 80) {
    return "XL";
  } else if (size >= 70) {
    return "L";
  } else if (size >= 50) {
    return "M";
  } else if (size >= 40) {
    return "S";
  } else if (size >= 30) {
    return "XS";
  } else {
    return "XXS";
  }
};

export default ({ dna, dnaDecoded }) => {
  const [showTraits, setShowTraits] = useState(false);
  const [grade, setGrade] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (dnaDecoded.length) {
      const grade_ = calculateGrade(
        Number(get(dnaDecoded, "lustre")) +
          Number(get(dnaDecoded, "surface")) +
          Number(get(dnaDecoded, "nacreQuality"))
      );
      setGrade(grade_);

      const size_ = calculateSize(Number(get(dnaDecoded, "size")));
      setSize(size_);
    }
  }, [dnaDecoded]);

  const RowStat = ({ label, value }) => (
    <div className="text-sm flex flex-row justify-between my-1">
      <div className="block">
        <p className="text-gray-500 font-semibold">{label}</p>
      </div>

      <div className="block">
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );

  const accordionData = [
    {
      title: "Traits",
      description: (
        <div>
          <RowStat label="Shape" value={get(dnaDecoded, "shape")} />
          <RowStat label="Color" value={get(dnaDecoded, "color")} />
          <RowStat label="Overtone" value={get(dnaDecoded, "overtone")} />
          <RowStat label="Rarity" value={get(dnaDecoded, "rarity").toLowerCase()} />
        </div>
      ),
    },
    {
      title: "Grading",
      description: (
        <div>
          <RowStat label="Grade" value={grade} />
          <RowStat label="Surface" value={get(dnaDecoded, "surface")} />
          <RowStat label="Lustre" value={get(dnaDecoded, "lustre")} />
          <RowStat label="Nacre Quality" value={get(dnaDecoded, "nacreQuality")} />
        </div>
      ),
    },
    {
      title: "Size",
      description: (
        <div>
          <RowStat label="Size" value={size} />
          <RowStat label="Value" value={get(dnaDecoded, "size")} />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex flex-col justify-between">
        <div className="flex justify-between flex-col sm:flex-row">
          {/** 3D Pearl with react three fiber */}
          <Pearl3DView
            width={400}
            height={400}
            pearlDna={dna}
            decodedDna={dnaDecoded}
            showTraitsTable={showTraits}
          />
          {/*<Pearl3DView />*/}
          <div className="w-full md:w-1/2 px-4 md:px-6">
            <Accordion data={accordionData} />
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 space-x-14 border-t">
          <Link to="/bank">
            <button className="px-4 p-3 rounded-xl shadown-xl bg-blue-500 text-white hover:bg-blue-300 font-semibold">
              Boost yield&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
            </button>
          </Link>

          <Link to="/farms">
            <button className="px-4 p-3 rounded-xl shadown-xl bg-green-500 text-white hover:bg-green-300 font-semibold">
              Produce more pearls&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
