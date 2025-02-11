// Get the keys of a pool (currency0, currency1, fee, tickSpacing, hooks)
export const getPoolKeys = async(positionManager, poolId) => {
    try {
        const [
            currency0,
            currency1,
            fee,
            tickSpacing,
            hooks
        ] = await positionManager.read.poolKeys(poolId);
        
        return {
            currency0,
            currency1,
            fee,
            tickSpacing,
            hooks
        };
    } catch(error) {
        console.log("Error fetching pool keys:", error);
    }
}