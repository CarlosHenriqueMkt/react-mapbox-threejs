import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, IconButton, useTheme } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import usePopup from "../../hooks/usePopup";
import useVisibility from "../../hooks/useVisibility";

const PopupAlert = ({ alert }) => {
	const theme = useTheme();
	const [isOpen, closePopup] = usePopup();
	const [elementRef, intersectionRatio] = useVisibility();
	const navigate = useNavigate();

	if (!alert || !isOpen) return null;

	const handleViewFacility = () => {
		navigate(`/dubai/${alert.route}`);
	};

	return (
		<Box
			ref={elementRef}
			sx={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#f3f3f3",
				border: "1px solid #ffcccc",
				borderRadius: 4,
				boxShadow: 3,
				p: 2,
				zIndex: 9999,
				minWidth: 400,
				opacity: Math.max(0.5, intersectionRatio),
				transition: "opacity 0.3s ease-in-out",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<WarningIcon sx={{ color: "#ff4d4d" }} />
					<Typography variant="h6" sx={{ color: "#ff4d4d" }}>
						{alert.type}
					</Typography>
				</Box>
				<IconButton
					onClick={() => {
						closePopup();
					}}
					size="small"
				>
					<HighlightOffIcon sx={{ color: "black" }} />
				</IconButton>
			</Box>
			<Typography variant="body2" sx={{ mt: 1 }}>
				Attention needed in{" "}
				<Button
					sx={{
						background: "transparent",
						color: theme.palette.link.main,
						padding: 0,
						margin: 0,
						textTransform: "none",
						textDecoration: "underline",
						"&:hover": {
							background: "transparent",
						},
						"&::first-letter": {
							textTransform: "uppercase",
						},
					}}
					onClick={handleViewFacility}
				>
					{alert.building}
				</Button>
			</Typography>
		</Box>
	);
};

export default PopupAlert;
