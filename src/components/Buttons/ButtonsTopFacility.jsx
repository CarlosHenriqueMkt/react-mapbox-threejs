import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonsTopFacility() {
	const theme = useTheme();
	const navigate = useNavigate();

	const handleClickMap = () => {
		navigate("/dubai");
	};

	const handleClickCube = () => {
		console.log("Cube button clicked");
	};

	return (
		<Box
			sx={{
				display: "flex",
				gap: 2,
				position: "absolute",
				top: 120,
				right: 20,
				backgroundColor: "transparent",
				overflow: "hidden",
			}}
		>
			<Button
				onClick={handleClickMap}
				sx={{
					borderRadius: "12px",
					backgroundColor: theme.palette.background.main,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "66px",
					height: "66px",
					transition: "background-color 1s ease",
					"&:hover": {
						backgroundColor: theme.palette.primary.light,
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: theme.palette.primary.light,
						borderRadius: "6px",
						width: "52px",
						height: "52px",
					}}
				>
					<Box
						component="img"
						src="/icon/map.svg"
						alt="map icon"
						style={{ width: "24px", height: "24px" }}
					/>
				</Box>
			</Button>
			{/* <Button
				onClick={handleClickCube}
				sx={{
					borderRadius: "12px",
					backgroundColor: theme.palette.background.main,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "66px",
					height: "66px",
					transition: "background-color 1s ease",
					"&:hover": {
						backgroundColor: theme.palette.primary.light,
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: theme.palette.primary.light,
						borderRadius: "6px",
						width: "52px",
						height: "52px",
					}}
				>
					<Box
						component="img"
						src="/icon/cube.svg"
						alt="cube icon"
						style={{ width: "24px", height: "24px" }}
					/>
				</Box>
			</Button> */}
		</Box>
	);
}
