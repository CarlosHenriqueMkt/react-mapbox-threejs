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
import { login } from "../../api/authService"; // Importe o serviço de autenticação

export default function LoginPage() {
	const theme = useTheme();
	const [showPassword, setShowPassword] = React.useState(false);
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [rememberMe, setRememberMe] = React.useState(false); // Estado para o checkbox "Remember Me"
	const [errorMessage, setErrorMessage] = React.useState(""); // Estado para a mensagem de erro
	const navigate = useNavigate();

	React.useEffect(() => {
		// Verifica se as credenciais estão armazenadas no localStorage
		const savedUsername = localStorage.getItem("savedUsername");
		const savedPassword = localStorage.getItem("savedPassword");
		if (savedUsername && savedPassword) {
			setUsername(savedUsername);
			setPassword(savedPassword);
			setRememberMe(true);
		}
	}, []);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleLogin = async () => {
		try {
			// Tenta fazer login com o nome de usuário e senha fornecidos
			await login(username, password);

			// Salva as credenciais se o checkbox "Remember Me" estiver marcado
			if (rememberMe) {
				localStorage.setItem("savedUsername", username);
				localStorage.setItem("savedPassword", password);
			} else {
				localStorage.removeItem("savedUsername");
				localStorage.removeItem("savedPassword");
			}

			// Se o login for bem-sucedido, redireciona para a página /dubai
			navigate("/dubai");
		} catch (error) {
			// Verifica se o erro está no login ou na senha
			if (error.message.includes("username")) {
				setErrorMessage("Incorrect username. Please try again.");
			} else if (error.message.includes("password")) {
				setErrorMessage("Incorrect password. Please try again.");
			} else {
				setErrorMessage("Login failed. Please check your credentials.");
			}
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
					value={username} // Bind ao estado de username
					onChange={(e) => setUsername(e.target.value)} // Atualiza o estado de username
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
					value={password} // Bind ao estado de password
					onChange={(e) => setPassword(e.target.value)} // Atualiza o estado de password
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
					onClick={handleLogin} // Chama a função handleLogin ao clicar
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
