import React, { useState, useCallback, useMemo } from "react";
import {
	Box,
	IconButton,
	InputBase,
	Toolbar,
	Avatar,
	Typography,
	Link,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { ArrowDropDown, NotificationsOutlined } from "@mui/icons-material";
import SearchBar from "../SearchBar";
import Viewer from "./Viewer";
import Facilities from "./Facilities";
import SolutionsScenarios from "./SolutionsScenarios";
import ToggleHandler from "../ToggleHandler";

export default function CityHeader({ moveCameraToCoordinates }) {
	const [openDropdown, setOpenDropdown] = useState(null);
	const location = useLocation();

	const handleToggleDropdown = useCallback((key) => {
		setOpenDropdown((prev) => (prev === key ? null : key));
	}, []);

	const renderButtons = useMemo(() => {
		if (location.pathname.startsWith("/dubai")) {
			return location.pathname.match(/\/dubai\/[^/]+$/) ? (
				<SolutionsScenarios
					open={openDropdown === "solutions"}
					toggleDropdown={() => handleToggleDropdown("solutions")}
				/>
			) : (
				<ToggleHandler />
			);
		}
		return null;
	}, [location.pathname, openDropdown, handleToggleDropdown]);

	const handleBuildingSelect = (coordinates) => {
		if (
			moveCameraToCoordinates &&
			typeof moveCameraToCoordinates.current === "function"
		) {
			moveCameraToCoordinates.current(coordinates);
		} else {
			console.error(
				"moveCameraToCoordinates.current is not defined or is not a function"
			);
		}
	};

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				alignItem: "center",
				justifyContent: "center",
				padding: 2,
			}}
		>
			<Box
				sx={{
					backgroundColor: "white",
					boxShadow: 3,
					width: "100%",
					height: "80px",
					borderRadius: "16px",
				}}
			>
				<Toolbar
					sx={{
						height: "100%",
						justifyContent: "space-between",
						padding: 2,
					}}
					disableGutters
				>
					<Box display="flex" alignItems="center" gap="16px">
						<Viewer />
						<Link href="/dubai">
							<Box
								component="img"
								src="/logo.png"
								alt="VirtuX Logo"
								sx={{ height: 30, marginRight: 2 }}
							/>
						</Link>
						<Facilities
							open={openDropdown === "facilities"}
							toggleDropdown={() =>
								handleToggleDropdown("facilities")
							}
						/>
						{renderButtons}
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 3,
							marginRight: 2,
						}}
					>
						<SearchBar
							onBuildingSelect={handleBuildingSelect} // Passe a função diretamente
						/>
						<IconButton>
							<NotificationsOutlined />
						</IconButton>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: 1,
								marginLeft: 2,
							}}
						>
							<Avatar
								alt="User Avatar"
								src="/avatar.png"
								sx={{ marginRight: 1 }}
							/>
							<Box
								sx={{
									width: "max-content",
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Typography variant="body2">
									Azunyan U. Wu
								</Typography>
								<Typography
									variant="caption"
									color="textSecondary"
								>
									Basic Member
								</Typography>
							</Box>
							<IconButton>
								<ArrowDropDown />
							</IconButton>
						</Box>
					</Box>
				</Toolbar>
			</Box>
		</Box>
	);
}
