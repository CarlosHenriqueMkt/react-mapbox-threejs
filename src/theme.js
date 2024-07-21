import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: "#7932FF",
			light: "#F4F2FF",
		},
		danger: {
			main: "#DF2935",
		},
		background: {
			main: "#FEFEFF",
		},
	},
});

export default theme;
