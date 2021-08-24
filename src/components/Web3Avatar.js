import React from "react";
import Color from "color";
import MersenneTwister from "mersenne-twister";

const Canvas = ({ children, color, size, className = "", style = {}, ...rest }) => (
  <div
    className={className}
    style={{
      borderRadius: "50px",
      display: "inline-block",
      overflow: "hidden",
      margin: 0,
      padding: 0,
      backgroundColor: color,
      height: size,
      width: size,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

const Avatar = ({ size, seed, className = "", style = {}, svgStyle = {}, ...rest }) => {
  const avatarColors = [
    "#f5555a", //'red-500'
    "#e8933c", //'orange-500'
    "#fae9a5", //'yellow-400'
    "#f9e38f", //'yellow-500'
    "#e0cc81", //'yellow-600'
    "#adbdff", //'blue-400'
    "#849cff", //'blue-500'
    "#7691ff", //'blue-600'
  ];

  const generator = new MersenneTwister(seed);

  const genColor = (avatarColors) => {
    const idx = Math.floor(avatarColors.length * generator.random());
    const color = avatarColors.splice(idx, 1)[0];
    return color;
  };

  const hueShift = (avatarColors, generator) => {
    const wobble = 30;
    const amount = generator.random() * 30 - wobble / 2;
    return avatarColors.map((hex) => {
      const color = Color(hex);
      color.rotate(amount);
      return color.hex();
    });
  };

  const genShape = (remainingColors, size, i, total) => {
    const center = size / 2;
    const firstRot = generator.random();
    const angle = Math.PI * 2 * firstRot;
    const velocity = (size / total) * generator.random() + (i * size) / total;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    const translate = "translate(" + tx + " " + ty + ")";

    // Third random is a shape rotation on top of all of that.
    const secondRot = generator.random();
    const rot = firstRot * 360 + secondRot * 180;
    const rotate = "rotate(" + rot.toFixed(1) + " " + center + " " + center + ")";
    const transform = translate + " " + rotate;
    const fill = genColor(remainingColors);

    return (
      <rect
        key={i}
        x="0"
        y="0"
        rx="0"
        ry="0"
        height={size}
        width={size}
        transform={transform}
        fill={fill}
      />
    );
  };

  const shapeCount = 4;
  const remainingColors = hueShift(avatarColors.slice(), generator);
  const shapesArr = Array(shapeCount).fill();

  return (
    <Canvas
      color={genColor(remainingColors)}
      size={size}
      style={style}
      className={className || "canvas"}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        height={size}
        width={size}
        style={svgStyle}
      >
        {shapesArr.map((s, i) => genShape(remainingColors, size, i, shapeCount - 1))}
      </svg>
    </Canvas>
  );
};

const Web3Avatar = ({
  address = "0x0000000000000000000000000000000000000000",
  size = 100,
  className = "",
  style = {},
  svgStyle = {},
  ...props
}) => {
  if (["", null, undefined].includes(address))
    address = "0x0000000000000000000000000000000000000000";
  return (
    <Avatar
      seed={parseInt(address.slice(2, 10), 16)}
      size={size}
      className={className}
      style={style}
      svgStyle={svgStyle}
      {...props}
    />
  );
};

export default Web3Avatar;
