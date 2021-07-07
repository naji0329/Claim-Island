import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { traits } from "../../components/three/3DClams/config/traits";
import { getTraits } from "../../components/three/3DClams/main";

import Clams3D from "../../components/three/3DClams/3DClams";
import "./ClamViewer.scss";

const SHELL_SHAPES = Object.keys(traits.shellShape.shapes);
const TONGUE_SHAPES = Object.keys(traits.tongue.shapes);
const PATTERNS = Object.keys(traits.pattern.styles);

const DEFAULT_COLOR = {
  r: 0,
  g: 0,
  b: 0,
  a: 0,
};

const DEFAULT_TRAITS = {
  ...getTraits(),
  ...{
    shellColour: DEFAULT_COLOR,
    innerColour: DEFAULT_COLOR,
    lipColour: DEFAULT_COLOR,
    tongueColour: DEFAULT_COLOR,
  },
};

const ClamViewer = () => {
  const [shellColour, setShellColor] = useState(DEFAULT_COLOR);
  const [innerColour, setInnerColor] = useState(DEFAULT_COLOR);
  const [lipColour, setLipColor] = useState(DEFAULT_COLOR);
  const [tongueColour, setTongueColor] = useState(DEFAULT_COLOR);

  const [shellShape, setShellShape] = useState(DEFAULT_TRAITS.shellShape);
  const [tongueShape, setTongueShape] = useState(DEFAULT_TRAITS.tongue);
  const [pattern, setPattern] = useState(DEFAULT_TRAITS.pattern);

  const [traits, setTraits] = useState(DEFAULT_TRAITS);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  useEffect(() => {
    setTraits({
      ...traits,
      ...{
        shellShape,
        tongue: tongueShape,
        pattern,
        shellColour,
        innerColour,
        lipColour,
        tongueColour,
      },
    });
  }, [
    shellColour,
    innerColour,
    lipColour,
    tongueColour,
    shellShape,
    tongueShape,
    pattern,
  ]);

  return (
    <div className="Clam-Viewer min-w-screen min-h-screen flex flex-column space-x-4 items-center relative">
      <h2 className="header mt-4">Clam Viewer</h2>
      <div className="flex-1 mt-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <h2>Shell Colour</h2>
            <SketchPicker
              className=""
              color={shellColour}
              onChangeComplete={(color) => {
                setShellColor(color.rgb);
              }}
            />
          </div>
          <div>
            <h2>Inner Colour</h2>
            <SketchPicker
              className=""
              color={innerColour}
              onChangeComplete={(color) => {
                setInnerColor(color.rgb);
              }}
            />
          </div>
          <div>
            <h2>Lip Colour</h2>
            <SketchPicker
              className=""
              color={lipColour}
              onChangeComplete={(color) => {
                setLipColor(color.rgb);
              }}
            />
          </div>
          <div>
            <h2>Tongue Colour</h2>
            <SketchPicker
              className=""
              color={tongueColour}
              onChangeComplete={(color) => {
                setTongueColor(color.rgb);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 mt-2">
        <div className="grid grid-cols-4 gap-4">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={() => {
              setDropdownOpen((prevState) => !prevState);
            }}
          >
            <DropdownToggle caret>Shell Shape - {shellShape}</DropdownToggle>
            <DropdownMenu>
              {SHELL_SHAPES.map((k, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => {
                    setShellShape(k);
                  }}
                >
                  {k}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown
            isOpen={dropdownOpen1}
            toggle={() => {
              setDropdownOpen1((prevState) => !prevState);
            }}
          >
            <DropdownToggle caret>Tongue Shape - {tongueShape}</DropdownToggle>
            <DropdownMenu>
              {TONGUE_SHAPES.map((k, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => {
                    setTongueShape(k);
                  }}
                >
                  {k}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown
            isOpen={dropdownOpen2}
            toggle={() => {
              setDropdownOpen2((prevState) => !prevState);
            }}
          >
            <DropdownToggle caret>Pattern - {pattern}</DropdownToggle>
            <DropdownMenu>
              {PATTERNS.map((k, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => {
                    setPattern(k);
                  }}
                >
                  {k}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-row">
        {
          <Clams3D
            width={500}
            height={500}
            clamViewer={true}
            clamTraits={traits}
            rgb={true}
            showSCTraits={true}
          />
        }
      </div>
    </div>
  );
};

export default ClamViewer;
