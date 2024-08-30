import { getAccessToken } from "./authService";

export const workOrdersSLABreach = async () => {
	try {
		const accessToken = getAccessToken();

		const response = await fetch(
			`https://dev.fm.api.afcomms.com/api/work-order/analysis/count/sla-breach?asset=66c9bd56613b297ff804d0ef`,
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
