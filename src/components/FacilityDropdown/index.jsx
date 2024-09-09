import React, { useState, useCallback } from "react";
import {
	Box,
	List,
	ListItemButton,
	ListItemText,
	Collapse,
	Typography,
	TextField,
	InputAdornment,
	Button,
	CircularProgress,
	useTheme,
} from "@mui/material";
import {
	ExpandLess,
	ExpandMore,
	Search as SearchIcon,
} from "@mui/icons-material";
import DropdownBoxContainer from "../../styledComponents/Dropdown"; // Supondo que você tenha um styled component para Dropdown

const mockedFacilities = [
	{
		id: 1,
		name: "Al-Hoda Tower",
		locations: [
			{
				id: 1,
				name: "Locations 1",
				spaces: [
					{
						id: 1,
						name: "Space 1",
						subspaces: [
							{
								id: 1,
								name: "Sub Space 1",
								details: ["Swimming Pool", "Tank"],
							},
							{
								id: 2,
								name: "Sub Space 2",
								details: [
									"Subspace Detail 1",
									"Subspace Detail 2",
								],
							},
						],
					},
					{
						id: 2,
						name: "Space 2",
						subspaces: [],
					},
				],
			},
			{
				id: 2,
				name: "Locations 2",
				spaces: [],
			},
			{
				id: 3,
				name: "Locations 3",
				spaces: [],
			},
		],
	},
];

export default function FacilityDropdown({ open, toggleDropdown }) {
	const theme = useTheme();
	const [search, setSearch] = useState("");
	const [openFacility, setOpenFacility] = useState(null);
	const [openLocation, setOpenLocation] = useState(null);
	const [openSpace, setOpenSpace] = useState(null);
	const [openSubspace, setOpenSubspace] = useState(null);

	const handleToggle = (id, type) => {
		switch (type) {
			case "facility":
				setOpenFacility(openFacility === id ? null : id);
				setOpenLocation(null);
				setOpenSpace(null);
				setOpenSubspace(null);
				break;
			case "location":
				setOpenLocation(openLocation === id ? null : id);
				setOpenSpace(null);
				setOpenSubspace(null);
				break;
			case "space":
				setOpenSpace(openSpace === id ? null : id);
				setOpenSubspace(null);
				break;
			case "subspace":
				setOpenSubspace(openSubspace === id ? null : id);
				break;
			default:
				break;
		}
	};

	const handleSearchChange = useCallback((event) => {
		setSearch(event.target.value);
	}, []);

	const renderFilteredFacilities = useCallback(() => {
		return mockedFacilities
			.filter((facility) =>
				facility.name.toLowerCase().includes(search.toLowerCase())
			)
			.map((facility) => (
				<React.Fragment key={facility.id}>
					<ListItemButton
						onClick={() => handleToggle(facility.id, "facility")}
					>
						<ListItemText primary={facility.name} />
						{openFacility === facility.id ? (
							<ExpandLess />
						) : (
							<ExpandMore />
						)}
					</ListItemButton>
					<Collapse
						in={openFacility === facility.id}
						timeout="auto"
						unmountOnExit
					>
						<List component="div" disablePadding>
							{facility.locations.map((location) => (
								<React.Fragment key={location.id}>
									<ListItemButton
										sx={{ pl: 4 }}
										onClick={() =>
											handleToggle(
												location.id,
												"location"
											)
										}
									>
										<ListItemText primary={location.name} />
										{openLocation === location.id ? (
											<ExpandLess />
										) : (
											<ExpandMore />
										)}
									</ListItemButton>
									<Collapse
										in={openLocation === location.id}
										timeout="auto"
										unmountOnExit
									>
										<List component="div" disablePadding>
											{location.spaces.map((space) => (
												<React.Fragment key={space.id}>
													<ListItemButton
														sx={{ pl: 8 }}
														onClick={() =>
															handleToggle(
																space.id,
																"space"
															)
														}
													>
														<ListItemText
															primary={space.name}
														/>
														{openSpace ===
														space.id ? (
															<ExpandLess />
														) : (
															<ExpandMore />
														)}
													</ListItemButton>
													<Collapse
														in={
															openSpace ===
															space.id
														}
														timeout="auto"
														unmountOnExit
													>
														<List
															component="div"
															disablePadding
														>
															{space.subspaces.map(
																(subspace) => (
																	<React.Fragment
																		key={
																			subspace.id
																		}
																	>
																		<ListItemButton
																			sx={{
																				pl: 12,
																			}}
																			onClick={() =>
																				handleToggle(
																					subspace.id,
																					"subspace"
																				)
																			}
																		>
																			<ListItemText
																				primary={
																					subspace.name
																				}
																			/>
																			{openSubspace ===
																			subspace.id ? (
																				<ExpandLess />
																			) : (
																				<ExpandMore />
																			)}
																		</ListItemButton>
																		<Collapse
																			in={
																				openSubspace ===
																				subspace.id
																			}
																			timeout="auto"
																			unmountOnExit
																		>
																			<List
																				component="div"
																				disablePadding
																				sx={{
																					pl: 16,
																				}}
																			>
																				{subspace.details.map(
																					(
																						detail,
																						index
																					) => (
																						<Typography
																							key={
																								index
																							}
																							variant="body2"
																						>
																							{
																								detail
																							}
																						</Typography>
																					)
																				)}
																			</List>
																		</Collapse>
																	</React.Fragment>
																)
															)}
														</List>
													</Collapse>
												</React.Fragment>
											))}
										</List>
									</Collapse>
								</React.Fragment>
							))}
						</List>
					</Collapse>
				</React.Fragment>
			));
	}, [search, openFacility, openLocation, openSpace, openSubspace]);

	return (
		<Box
			sx={{
				paddingInline: "16px",
				borderRadius: "8px",
				overflow: "hidden",
				width: "fit-content",
			}}
		>
			<Box
				onClick={toggleDropdown}
				sx={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					gap: "8px",
					paddingBlock: "13px",
					cursor: "pointer",
					backgroundColor: "transparent",
				}}
			>
				<Typography variant="body1" sx={{ ml: 1, fontWeight: 700 }}>
					Facilities
				</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "8px",
						width: "40px",
						height: "40px",
						transition: "transform 0.3s ease",
						transform: open ? "rotate(0deg)" : "rotate(-90deg)",
						color: open ? theme.palette.primary.main : "inherit",
					}}
				>
					<ExpandMore sx={{ fontSize: "24px" }} />
				</Box>
			</Box>
			<DropdownBoxContainer open={open}>
				<Box sx={{ padding: 1 }}>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Search"
						value={search}
						onChange={handleSearchChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Box>
				<Box
					sx={{
						maxHeight: "300px", // Ajuste a altura conforme necessário
						overflowY: "auto",
						"&::-webkit-scrollbar": {
							width: "8px",
						},
						"&::-webkit-scrollbar-track": {
							backgroundColor: "#F4F2FF",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: "#BEAEFF",
							borderRadius: "8px",
						},
					}}
				>
					<List
						component="nav"
						aria-labelledby="nested-list-subheader"
					>
						{renderFilteredFacilities()}
					</List>
				</Box>
			</DropdownBoxContainer>
		</Box>
	);
}
