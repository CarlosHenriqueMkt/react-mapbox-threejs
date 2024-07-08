import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button, Grid, Drawer, Typography, IconButton } from '@mui/material';
import Scene1 from './components/homeScene';
import Scene2 from './components/anotherPageScene';
import MainRenderer from './components/canvas';
import CloseIcon from '@mui/icons-material/Close';

const App = () => {
  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <NavButtons />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className="sidebar">
            <h2>Sidebar</h2>
            <p>Navigation and other contents go here.</p>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className="main-content">
            <Main />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const Main = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const handleAreaClick = (intersectedObject) => {
    setDrawerContent(intersectedObject.name);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const renderOverlay = () => {
    switch (location.pathname) {
      case '/':
        return <Scene1Overlay />;
      case '/scene2':
        return <Scene2Overlay />;
      default:
        return null;
    }
  };

  const getDrawerContent = () => {
    switch (drawerContent) {
      case 'area01':
        return <Typography variant="body1">Content for Area 01</Typography>;
      case 'area02':
        return <Typography variant="body1">Content for Area 02</Typography>;
      case 'area03':
        return <Typography variant="body1">Content for Area 03</Typography>;
      case 'createdArea':
        return <Typography variant="body1">Content for Created Area</Typography>;
      default:
        return <Typography variant="body1">No content available</Typography>;
    }
  };

  return (
    <>
      <MainRenderer>
        <Routes>
          <Route path="/" element={<Scene1 handleAreaClick={handleAreaClick} />} />
          <Route path="/scene2" element={<Scene2 handleAreaClick={handleAreaClick} />} />
        </Routes>
      </MainRenderer>
      {renderOverlay()}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <div style={{ width: 250, padding: 16 }}>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">{drawerContent}</Typography>
          {getDrawerContent()}
        </div>
      </Drawer>
    </>
  );
};

const NavButtons = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <Button 
        color="inherit" 
        component={Link} 
        to="/" 
        className={currentPath === '/' ? 'disabled' : ''}
      >
        Scene 1
      </Button>
      <Button 
        color="inherit" 
        component={Link} 
        to="/scene2" 
        className={currentPath === '/scene2' ? 'disabled' : ''}
      >
        Scene 2
      </Button>
    </>
  );
};

const Scene1Overlay = () => (
  <div className="overlay">
    <label htmlFor="material-select">Choose a material for Scene 1:</label>
    <select id="material-select">
      <option value="material1">Material 1</option>
      <option value="material2">Material 2</option>
      <option value="material3">Material 3</option>
    </select>
  </div>
);

const Scene2Overlay = () => (
  <div className="overlay">
    <label htmlFor="material-select">Choose a material for Scene 2:</label>
    <select id="material-select">
      <option value="materialA">Material A</option>
      <option value="materialB">Material B</option>
      <option value="materialC">Material C</option>
    </select>
  </div>
);

export default App;
