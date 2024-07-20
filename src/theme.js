import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: "#7932FF",
			secundary: "#F4F2FF",
			background: "#FEFEFF",
		},
		danger: {
			main: "#DF2935",
		},
	},
});

export default theme;
