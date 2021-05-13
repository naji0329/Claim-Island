import React from 'react';

import './Home.css';
import Map from '../../components/Map'
import Map3D from '../../components/three/3DMap'

// Main Home Component
const Home = () => {
  return(
      <div className="Home" style={{height: '95.5vh'}}>
        {/* <Map></Map> */}
        <Map3D></Map3D>
      </div>
  );
};

export default Home;