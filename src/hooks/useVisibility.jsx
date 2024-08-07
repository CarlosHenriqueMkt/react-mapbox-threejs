import { useState, useEffect, useRef } from "react";

const useVisibility = () => {
	const [isVisible, setIsVisible] = useState(true);
	const elementRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.intersectionRatio); // Usando o intersectionRatio para determinar a visibilidade parcial
			},
			{
				threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Cria um array com valores de 0 a 1 em passos de 0.01
			}
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []);

	return [elementRef, isVisible];
};

export default useVisibility;
