import { slice } from "viem";

// Get the keys of a pool (currency0, currency1, fee, tickSpacing, hooks)
export const getPoolKeys = async(positionManager, poolId) => {
	try {
		const poolIdBytes25 = slice(poolId, 0, 25);
		const [
			currency0,
			currency1,
			fee,
			tickSpacing,
			hooks
		] = await positionManager.read.poolKeys([poolIdBytes25]);
		
		return {
			currency0,
			currency1,
			fee,
			tickSpacing,
			hooks
		};
	} catch(error) {
			console.error("Error fetching pool keys:", error);
      return null;
	}
}