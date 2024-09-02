import { getAccessToken } from "./authService";

export const fetchTotalCityStatus = async () => {
	try {
		const accessToken = getAccessToken();

		const response = await fetch(
			`https://dev-2.api.facilitrol-x.xyz/api/work-order/analysis/count/status`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch facility data");
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Error fetching facility data:", error);
		return null;
	}
};
