import './App.css';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button, Grid } from '@mui/material';
import Scene1 from './components/homeScene';
import Scene2 from './components/anotherPageScene';
import MainRenderer from './components/canvas';
import IntersectionDrawer from './components/IntersectionDrawer';
import React, { useState } from 'react';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
            <Main setDrawerOpen={setDrawerOpen} />
          </div>
        </Grid>
      </Grid>
      <IntersectionDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Container>
  );
};

const Main = ({ setDrawerOpen }) => {
  const location = useLocation();

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

  return (
    <>
      <MainRenderer setDrawerOpen={setDrawerOpen}>
        <Routes>
          <Route path="/" element={<Scene1 setDrawerOpen={setDrawerOpen} />} />
          <Route path="/scene2" element={<Scene2 setDrawerOpen={setDrawerOpen} />} />
        </Routes>
      </MainRenderer>
      {renderOverlay()}
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
