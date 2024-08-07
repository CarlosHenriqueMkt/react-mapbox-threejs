import { useState, useCallback } from "react";

const usePopup = () => {
	const [isOpen, setIsOpen] = useState(true);

	const closePopup = useCallback(() => {
		setIsOpen(false);
	}, []);

	return [isOpen, closePopup];
};

export default usePopup;
