import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	TextField,
	Typography,
	InputAdornment,
	IconButton,
	useTheme,
} from "@mui/material";
import {
	AccountCircle,
	Lock,
	Visibility,
	VisibilityOff,
} from "@mui/icons-material";

export default function LoginPage() {
	const theme = useTheme();
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const navigate = useNavigate();
	const handleLogin = () => {
		navigate("/dubai");
	};

	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: {
					xs: "space-between",
					md: "space-between",
					lg: "center",
				},
				flexDirection: { xs: "column", md: "row" },
				gap: {
					xs: theme.spacing(2),
					md: theme.spacing(6),
					lg: theme.spacing(20),
				},
				padding: theme.spacing(10),
				background: theme.palette.primary.background,
			}}
		>
			<Box
				sx={{
					width: "fit-content",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: theme.spacing(2),
				}}
				className="imageWrapper"
			>
				<img src="logo.png" alt="Virtu-X" />
				<img src="cityscape.png" alt="Cityscape" />
			</Box>
			<Box
				sx={{
					width: { xs: "100%", md: "70%", lg: "30%" },
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="h4" gutterBottom>
					Login
				</Typography>
				<Typography variant="subtitle1" gutterBottom>
					Welcome Back!
				</Typography>
				<TextField
					label="Username"
					variant="outlined"
					fullWidth
					margin="normal"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircle />
							</InputAdornment>
						),
					}}
				/>
				<TextField
					label="Password"
					variant="outlined"
					type={showPassword ? "text" : "password"}
					fullWidth
					margin="normal"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Lock />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={handleClickShowPassword}
									edge="end"
									aria-label="toggle password visibility"
								>
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					sx={{ marginTop: theme.spacing(3) }}
					onClick={handleLogin}
				>
					Login
				</Button>
			</Box>
		</Box>
	);
}
