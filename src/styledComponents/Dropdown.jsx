import { styled } from "@mui/system";
import { Box } from "@mui/material";

const DropdownBox = styled(Box)(({ theme, open }) => ({
	height: open ? "600px" : "0",
	overflowY: "hidden", // Change this when the number of items overflow the open height
	transition: "all 0.5s ease",
	marginTop: open ? 16 : 0,
	backgroundColor: theme.palette.background.paper,
}));

export default DropdownBox;
