import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonsBottomFacility() {
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
				flexDirection: "column",
				gap: 1,
				position: "absolute",
				top: 600,
				right: 35,
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
					width: "52px",
					height: "52px",
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
						width: "42px",
						height: "42px",
					}}
				>
					<Box
						component="img"
						src="/icon/3d-square.svg"
						alt="3D Square icon"
						style={{ width: "20px", height: "20px" }}
					/>
				</Box>
			</Button>
			<Button
				onClick={handleClickMap}
				sx={{
					borderRadius: "12px",
					backgroundColor: theme.palette.background.main,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "52px",
					height: "52px",
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
						width: "42px",
						height: "42px",
					}}
				>
					<Box
						component="img"
						src="/icon/set.svg"
						alt="set icon"
						style={{ width: "16px", height: "16px" }}
					/>
				</Box>
			</Button>

			{/* Buttons Group */}
			<Box
				sx={{
					backgroundColor: theme.palette.background.main,
					borderRadius: "8px",
				}}
			>
				<Button
					onClick={handleClickCube}
					sx={{
						borderRadius: "12px",
						backgroundColor: theme.palette.background.main,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "52px",
						height: "52px",
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
							width: "42px",
							height: "42px",
						}}
					>
						<Box
							component="img"
							src="/icon/expand.svg"
							alt="expand icon"
							style={{ width: "16px", height: "16px" }}
						/>
					</Box>
				</Button>
				<Button
					onClick={handleClickCube}
					sx={{
						borderRadius: "12px",
						backgroundColor: theme.palette.background.main,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "52px",
						height: "52px",
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
							width: "42px",
							height: "42px",
						}}
					>
						<Box
							component="img"
							src="/icon/vr.svg"
							alt="virtual reality icon"
							style={{ width: "16px", height: "16px" }}
						/>
					</Box>
				</Button>
				<Button
					onClick={handleClickCube}
					sx={{
						borderRadius: "8px",
						backgroundColor: "transparent",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "52px",
						height: "52px",
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
							width: "42px",
							height: "42px",
						}}
					>
						<Box
							component="img"
							src="/icon/maximize.svg"
							alt="virtual reality icon"
							style={{ width: "16px", height: "16px" }}
						/>
					</Box>
				</Button>
				<Button
					onClick={handleClickCube}
					sx={{
						borderRadius: "8px",
						backgroundColor: "transparent",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "52px",
						height: "52px",
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
							width: "42px",
							height: "42px",
						}}
					>
						<Box
							component="img"
							src="/icon/user-octagon.svg"
							alt="virtual reality icon"
							style={{ width: "16px", height: "16px" }}
						/>
					</Box>
				</Button>
			</Box>
		</Box>
	);
}
