import { getAccessToken } from "./authService";

export const fetchFacilityId = async () => {
	try {
		const accessToken = getAccessToken();

		const response = await fetch(
			`https://dev.fm.api.afcomms.com/api/asset/66c9bd56613b297ff804d0ef`,
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

		// Retorna o id do facility diretamente
		return result.data.id;
	} catch (error) {
		console.error("Error fetching facility data:", error);
		return null;
	}
};
