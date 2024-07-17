import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function LoginPage() {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("/dashboard");
	};

	return (
		<div>
			<h1>Login Page</h1>
			<Button variant="contained" color="primary" onClick={handleLogin}>
				Go to Dashboard
			</Button>
		</div>
	);
}
