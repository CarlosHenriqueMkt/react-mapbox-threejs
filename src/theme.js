import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
	typography: {
		fontFamily: "Montserrat, Arial, Helvetica, sans-serif",
	},
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
		link: {
			main: "#2377D1",
		},
		text: {
			black: "#080708",
			medium: "#4E4C4F",
		},
	},
});

export default theme;
