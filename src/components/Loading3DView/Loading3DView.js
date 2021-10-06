import { Html } from "@react-three/drei";

export const Loading3DView = ({ styles = {} }) => (
  <Html center>
    <div
      className="bg-gray-800 text-white px-4 py-3 rounded-lg"
      style={{
        ...styles,
      }}
    >
      LOADING
    </div>
  </Html>
);
