import { getAccessToken } from "./authService";

export const fetchFacilities = async () => {
	try {
		const accessToken = getAccessToken();

		const response = await fetch(
			`https://dev-2.api.facilitrol-x.xyz/api/asset?total=true&type=facility`,
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
		const data = result.data;
		return data;
	} catch (error) {
		console.error("Error fetching facility data:", error);
		return null;
	}
};
