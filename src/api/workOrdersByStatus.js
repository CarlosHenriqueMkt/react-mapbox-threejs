import { getAccessToken } from "./authService";

export const workOrdersByStatus = async (id) => {
	try {
		const accessToken = getAccessToken();

		const response = await fetch(
			`https://dev-2.api.facilitrol-x.xyz/api/work-order?total=true&asset=${id}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch work order data");
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Error fetching total records:", error);
		return null;
	}
};
