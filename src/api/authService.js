// src/api/authService.js

let storedUsername = ""; // Variável para armazenar o username após login
let storedPassword = ""; // Variável para armazenar o password após login

// Funções para obter e definir tokens no localStorage
export const getAccessToken = () => {
	const token = localStorage.getItem("accessToken");
	console.log("Access token retrieved:", token);
	return token;
};

export const getRefreshToken = () => {
	const token = localStorage.getItem("refreshToken");
	console.log("Refresh token retrieved:", token);
	return token;
};

export const setAccessToken = (token) => {
	console.log("Setting access token:", token);
	localStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token) => {
	console.log("Setting refresh token:", token);
	localStorage.setItem("refreshToken", token);
};

// Função para fazer login e armazenar tokens
export const login = async (username, password) => {
	console.log("Attempting to login with username:", username);

	storedUsername = username; // Armazena o username
	storedPassword = password; // Armazena o password

	const response = await fetch(
		"https://dev.fm.api.afcomms.com/api/auth/login",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		}
	);

	if (!response.ok) {
		console.error("Login failed with status:", response.status);
		throw new Error("Failed to login");
	}

	const result = await response.json();
	const data = result.data; // Acessa o objeto 'data' na resposta
	console.log("Login successful, tokens received:", data);

	setAccessToken(data.accessToken);
	setRefreshToken(data.refreshToken);

	// Inicia o agendamento para renovação do token
	scheduleTokenRenewal();

	return data;
};

// Função para renovar o token de acesso (refazendo o login)
export const renewAccessToken = async () => {
	console.log("Renewing tokens by re-logging in.");

	// Reutiliza o username e password armazenados no login inicial
	if (!storedUsername || !storedPassword) {
		throw new Error(
			"Username or password not stored. Cannot renew tokens."
		);
	}

	// Chama a função de login novamente para renovar os tokens
	const data = await login(storedUsername, storedPassword);

	// Certifique-se de que os tokens são corretamente armazenados
	setAccessToken(data.accessToken);
	setRefreshToken(data.refreshToken);

	console.log("Tokens renewed successfully:", {
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
	});

	return data;
};

// Função para agendar a renovação do token de acesso
export const scheduleTokenRenewal = () => {
	const accessToken = getAccessToken();

	if (!accessToken) {
		console.warn("No access token found, cannot schedule renewal.");
		return;
	}

	const jwtPayload = JSON.parse(atob(accessToken.split(".")[1]));
	const expiryTime = jwtPayload.exp * 1000; // Expiração em milissegundos
	const currentTime = new Date().getTime();
	const renewalTime = expiryTime - 60000; // 1 minuto antes da expiração

	const timeout = renewalTime - currentTime;

	console.log("Scheduling token renewal in", timeout / 1000, "seconds.");

	if (timeout > 0) {
		setTimeout(async () => {
			try {
				const data = await renewAccessToken();
				scheduleTokenRenewal(); // Reagendar a próxima renovação
			} catch (error) {
				console.error("Failed to renew access token:", error);
				// Aqui você pode redirecionar para login se a renovação falhar
			}
		}, timeout);
	} else {
		// Token já expirado ou expira em menos de 1 minuto
		console.log("Token is expired or expiring soon, renewing immediately.");
		renewAccessToken().then(scheduleTokenRenewal);
	}
};
