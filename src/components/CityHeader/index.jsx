import React, { useState } from "react";
import {
	Box,
	IconButton,
	InputBase,
	Toolbar,
	Avatar,
	Typography,
} from "@mui/material";
import { ArrowDropDown, NotificationsOutlined } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

export default function CityHeader() {
	const [searchText, setSearchText] = useState("");

	const handleInputChange = (event) => {
		setSearchText(event.target.value);
	};

	const handleClearSearch = () => {
		setSearchText("");
	};

	return (
		<Box
			sx={{
				width: "100vw",
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
					width: "98%",
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
					<Box
						component="img"
						src="logo.png"
						alt="VirtuX Logo"
						sx={{ height: 30, marginRight: 2 }}
					/>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 3,
							marginRight: 2,
						}}
					>
						<Box
							sx={{
								position: "relative",
								marginRight: 2,
								width: "300px",
							}}
						>
							<SearchIcon
								sx={{
									position: "absolute",
									left: 10,
									top: "50%",
									transform: "translateY(-50%)",
									color: "gray",
									zIndex: 999,
								}}
							/>
							<InputBase
								placeholder="Search"
								value={searchText}
								onChange={handleInputChange}
								sx={{
									paddingLeft: 6,
									paddingRight: 1,
									paddingY: 0.5,
									borderRadius: 2,
									backgroundColor: "#f1f1f1",
									width: "100%",
								}}
							/>
							{searchText && (
								<IconButton
									onClick={handleClearSearch}
									sx={{
										position: "absolute",
										right: 0,
										top: "50%",
										transform: "translateY(-50%)",
										color: "gray",
										zIndex: 999,
									}}
								>
									<CancelIcon />
								</IconButton>
							)}
						</Box>
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
								src="avatar.png"
								sx={{ marginRight: 1 }}
							/>
							<Box
								sx={{
									display: "flex",
									alignItems: "flex-start",
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
