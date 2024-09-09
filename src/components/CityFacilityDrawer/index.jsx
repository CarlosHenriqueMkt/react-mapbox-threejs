import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Button,
	IconButton,
	CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoCard from "../InfoCard";

// Mock data para substituir as chamadas de API
const mockWorkOrders = {
	totalRecords: 120,
	data: [
		{ status: "In Progress" },
		{ status: "In Progress" },
		{ status: "Closed" },
		{ status: "In Progress" },
		{ status: "Closed" },
		// mais dados...
	],
};

const mockSLAData = {
	slaBreach: {
		data: {
			restoration: 5,
		},
	},
};

export default function CityFacilityDrawer({ open, onClose, facilityData }) {
	const [sla, setSLA] = useState(null);
	const [statusCounts, setStatusCounts] = useState({});
	const [workOrder, setWorkOrder] = useState(null);
	const [loading, setLoading] = useState(true); // Adiciona estado de carregamento
	const navigate = useNavigate();

	useEffect(() => {
		if (facilityData?.id) {
			// Substitui as funções de chamada de API com dados mockados
			const getTotalWorkOrders = () => {
				const workOrders = mockWorkOrders;
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

			const getTotalSLA = () => {
				const total = mockSLAData;
				if (total) {
					setSLA(total);
				} else {
					console.error("Failed to fetch SLA breaches.");
				}
			};

			getTotalWorkOrders();
			getTotalSLA();

			// Configura um tempo limite de 1,5 segundos para o carregamento
			const loadingTimeout = setTimeout(() => {
				setLoading(false);
			}, 1500);

			return () => clearTimeout(loadingTimeout); // Limpa o timeout ao desmontar o componente
		}
	}, [facilityData?.id]);

	const slaMet = sla?.slaBreach?.data?.restoration;

	const handleViewFacility = () => {
		if (facilityData?.id) {
			navigate(`/dubai/${facilityData.id}`);
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
					{facilityData?.name || "Facility Name"}
				</Typography>
				<Typography
					variant="body2"
					sx={{ mb: 2, color: "text.secondary" }}
				>
					{facilityData?.location?.city || "Facility Location"}
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
						value={
							loading ? (
								<CircularProgress size={20} />
							) : (
								workOrder?.totalRecords ?? 0
							)
						}
						color="purple"
					/>
					<InfoCard
						title="Active WOs"
						value={
							loading ? (
								<CircularProgress size={20} />
							) : (
								statusCounts["In Progress"] ?? 0
							)
						}
						color="green"
					/>
					<InfoCard
						title="Closed WOs"
						value={
							loading ? (
								<CircularProgress size={20} />
							) : (
								statusCounts["Closed"] ?? 0
							)
						}
						color="blue"
					/>
					<InfoCard
						title="SLA Met"
						value={
							loading ? (
								<CircularProgress size={20} />
							) : (
								slaMet ?? 0
							)
						}
						color="purple"
					/>
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
