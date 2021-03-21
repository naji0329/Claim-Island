import React from 'react';

import './Home.css';
import Map from '../../components/Map'

// Main Home Component
const Home = () => {
  return(
      <div className="Home" style={{height: '95.5vh'}}>
        <Map></Map>
      </div>
  );
};

export default Home;