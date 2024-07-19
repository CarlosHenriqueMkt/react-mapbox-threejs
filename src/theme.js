import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: "#7932FF",
			background: "#FEFEFF",
		},
		danger: {
			main: "#DF2935",
		},
	},
});

export default theme;
