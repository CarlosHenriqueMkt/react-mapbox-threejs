import React from 'react';
import GroundFloor from '../models/GroundFloor';

const Scene1 = ({ handleAreaClick }) => {
  return (
    <GroundFloor onAreaClick={handleAreaClick} />
  );
};

export default Scene1;
