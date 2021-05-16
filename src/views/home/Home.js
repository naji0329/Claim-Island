import React from 'react';

import './Home.scss';
import Map from '../../components/Map'
import Map3D from '../../components/three/3DMap'
import CharacterSpeak from '../../components/characters';

// Main Home Component
const Home = () => {
  return(
      <div className="Home" style={{height: '95.5vh'}}>
        {/* <Map></Map> */}
        <Map3D></Map3D>
        <CharacterSpeak character={'nacre'} speech={'welcome'}/>
      </div>
  );
};

export default Home;