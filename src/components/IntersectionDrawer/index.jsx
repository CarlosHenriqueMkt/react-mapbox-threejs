// IntersectionDrawer.js
import React from 'react';
import { Drawer, Button } from '@mui/material';

const IntersectionDrawer = ({ open, onClose, drawerContent }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 250 }}>
        <h2>{drawerContent}</h2>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Drawer>
  );
};

export default IntersectionDrawer;
