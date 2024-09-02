import { getAccessToken } from "./authService";

export const fetchMarkerDataFromAPI = async () => {
	try {
		const accessToken = getAccessToken();

		const response = await fetch(
			"https://dev-2.api.facilitrol-x.xyz/api/asset/66c9bd56613b297ff804d0ef",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch asset data");
		}

		const result = await response.json();
		const location = result.data.location;

		if (!location || !location.longitude || !location.latitude) {
			console.error("Location data is missing or incomplete.");
			return null;
		}

		return {
			coordinates: [location.longitude, location.latitude],
			...result.data,
		};
	} catch (error) {
		console.error("Error fetching asset data:", error);
		return null;
	}
};
