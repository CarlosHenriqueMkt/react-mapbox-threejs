import { ViewHeadline } from "@mui/icons-material";
import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonsBottomDubai() {
	const theme = useTheme();

	const handleClick = () => {
		console.log("Preciso criar o pop-up com as instruções de uso");
	};

	return (
		<Box
			sx={{
				maxHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				gap: 1,
				position: "absolute",
				bottom: 40,
				right: 20,
				backgroundColor: "transparent",
				overflow: "hidden",
			}}
		>
			<Button
				onClick={handleClick}
				sx={{
					borderRadius: "8px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "52px",
					height: "52px",
					transition: "background-color 1s ease",
					backgroundColor: theme.palette.background.main,
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
						borderRadius: "4px",
						width: "48px",
						height: "46px",
					}}
				>
					<Box style={{ fontSize: "24px" }}>?</Box>
				</Box>
			</Button>
		</Box>
	);
}
