import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoCard from "../InfoCard";
import { workOrdersByStatus } from "../../api/workOrdersByStatus";
import { fetchFacilityId } from "../../api/fetchFacilityId";
import { workOrdersSLABreach } from "../../api/workOrderBySLABreach";

export default function ApiFacilityDrawer({ open, onClose }) {
	const [sla, setSLA] = useState(null);
	const [statusCounts, setStatusCounts] = useState({});
	const [workOrder, setWorkOrder] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const getTotalWorkOrders = async () => {
			const workOrders = await workOrdersByStatus();
			if (workOrders) {
				setWorkOrder(workOrders);
				const counts = workOrders.data.reduce((acc, workOrder) => {
					const status = workOrder.status;
					if (acc[status]) {
						acc[status] += 1;
					} else {
						acc[status] = 1;
					}
					return acc;
				}, {});
				setStatusCounts(counts);
			} else {
				console.error("Failed to fetch work orders.");
			}
		};

		const getTotalSLA = async () => {
			const total = await workOrdersSLABreach();
			if (total) {
				setSLA(total);
			} else {
				console.error("Failed to fetch SLA breaches.");
			}
		};

		getTotalWorkOrders();
		getTotalSLA();
	}, []);

	const slaMet = sla?.slaBreach?.total;

	const handleViewFacility = async () => {
		const id = await fetchFacilityId();
		if (id) {
			navigate(`/dubai/${id}`);
		}
	};

	return (
		<Box
			sx={{
				position: "fixed",
				top: "12%",
				right: open ? "16px" : "-400px",
				width: 400,
				height: 800,
				transition: "right 0.3s ease",
				backgroundColor: "white",
				boxShadow: 3,
				p: 2,
				borderRadius: 2,
				zIndex: 999,
			}}
		>
			<Box sx={{ position: "relative", height: "100%" }}>
				<IconButton
					onClick={onClose}
					sx={{
						position: "absolute",
						top: -8,
						right: -8,
						color: "black",
					}}
				>
					<HighlightOffIcon sx={{ fontSize: 20 }} />
				</IconButton>
				<Typography variant="body2" fontWeight="700">
					Details
				</Typography>
				<hr
					style={{
						marginBlock: "16px",
						border: "1px solid #F4F2FF",
					}}
				/>
				<Typography
					variant="h2"
					sx={{ fontSize: "16px", fontWeight: "700", mb: 1 }}
				>
					Azure Heights Residences
				</Typography>
				<Typography
					variant="body2"
					sx={{ mb: 2, color: "text.secondary" }}
				>
					Lorem Ipsum is simply and typesetting industry...
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						gap: 2,
						mb: 2,
					}}
				>
					<InfoCard title="Alarms" value="12" color="blue" />
					<InfoCard
						title="Work Orders"
						value={workOrder?.totalRecords ?? "Data not available"}
						color="purple"
					/>
					<InfoCard
						title="Active WOs"
						value={statusCounts["In Progress"] ?? 0}
						color="green"
					/>
					<InfoCard
						title="Closed WOs"
						value={statusCounts["Closed"] ?? 0}
						color="blue"
					/>
					<InfoCard title="SLA Met" value={slaMet} color="purple" />
					<InfoCard title="People" value="20" color="purple" />
				</Box>
				<Box sx={{ mb: 2 }}>
					{/* Gráfico de consumo de energia */}
					<Box
						component="img"
						src="/chart.png"
						sx={{
							width: "100%",
							height: "278px",
						}}
					/>
				</Box>
				<Button
					variant="contained"
					color="primary"
					onClick={handleViewFacility}
					sx={{ width: "100%" }}
				>
					View Facility
				</Button>
			</Box>
		</Box>
	);
}
