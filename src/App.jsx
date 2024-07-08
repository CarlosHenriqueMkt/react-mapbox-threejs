import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button, Grid } from '@mui/material';
import Scene1 from './components/homeScene';
import Scene2 from './components/anotherPageScene';
import MainRenderer from './components/canvas';

const App = () => {
  return (
    <Router>
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
              <MainRenderer>
                <Routes>
                  <Route path="/" element={<Scene1 />} />
                  <Route path="/scene2" element={<Scene2 />} />
                </Routes>
              </MainRenderer>
              <Overlay />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Router>
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

const Overlay = () => {
  const handleMaterialChange = (event) => {
    const material = event.target.value;
    console.log('Material changed to:', material);
  };

  return (
    <div className="overlay">
      <label htmlFor="material-select">Choose a material:</label>
      <select id="material-select" onChange={handleMaterialChange}>
        <option value="material1">Material 1</option>
        <option value="material2">Material 2</option>
        <option value="material3">Material 3</option>
      </select>
    </div>
  );
};

export default App;
