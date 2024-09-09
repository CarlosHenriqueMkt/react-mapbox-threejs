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
	Checkbox,
	FormControlLabel,
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
	const [username, setUsername] = React.useState("admin");
	const [password, setPassword] = React.useState("password");
	const [rememberMe, setRememberMe] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	const navigate = useNavigate();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleLogin = () => {
		// Simulação de login sem necessidade de API
		if (username === "admin" && password === "password") {
			if (rememberMe) {
				localStorage.setItem("savedUsername", username);
				localStorage.setItem("savedPassword", password);
			} else {
				localStorage.removeItem("savedUsername");
				localStorage.removeItem("savedPassword");
			}

			// Redireciona para a página /dubai após o login simulado
			navigate("/dubai");
		} else {
			setErrorMessage("Login failed. Please check your credentials.");
		}
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
				background: theme.palette.background.main,
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
				<img src="/logo.png" alt="Virtu-X" />
				<img src="/cityscape.png" alt="Cityscape" />
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
					value={username}
					onChange={(e) => setUsername(e.target.value)}
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
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
				<FormControlLabel
					control={
						<Checkbox
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
						/>
					}
					label="Remember Me"
					sx={{ alignSelf: "flex-start", marginLeft: 0 }}
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
				{errorMessage && (
					<Typography
						variant="body2"
						sx={{ color: "red", marginTop: theme.spacing(2) }}
					>
						{errorMessage}
					</Typography>
				)}
			</Box>
		</Box>
	);
}
