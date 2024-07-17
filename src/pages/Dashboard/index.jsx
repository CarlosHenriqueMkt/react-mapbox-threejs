import "./dashboard.css";
import React, { useState } from "react";
import { Container, AppBar, Toolbar, Button, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CustomDrawer from "../../components/Drawer";
import DashRoutes from "../../routes/DashRoutes";

export default function VXBoard() {
	const [openDrawerId, setOpenDrawerId] = useState(null);

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
						<DashRoutes setOpenDrawerId={setOpenDrawerId} />
					</div>
				</Grid>
			</Grid>
			{Array.from({ length: 9 }, (_, index) => (
				<CustomDrawer
					key={index}
					open={openDrawerId === index}
					onClose={() => setOpenDrawerId(null)}
					drawerContent={`Drawer Content for Mesh ${index + 1}`}
				/>
			))}
		</Container>
	);
}

const NavButtons = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<>
			<Button
				color="inherit"
				component={Link}
				to="/"
				className={currentPath === "/" ? "disabled" : ""}
			>
				Scene 1
			</Button>
			<Button
				color="inherit"
				component={Link}
				to="/scene2"
				className={currentPath === "/scene2" ? "disabled" : ""}
			>
				Scene 2
			</Button>
		</>
	);
};
