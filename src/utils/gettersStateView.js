// Get the total liquidity of the pool
export const getPoolLiquidity = async (stateView, poolId) => {
  try {
    const liquidity = await stateView.read.getLiquidity([poolId]);

    return liquidity;
  } catch (error) {
    console.error("Error fetching pool liquidity:", error);
    return null;
  }
};

// Get the pool state
export const getPoolState = async (stateView, poolId) => {
  try {
    const [sqrtPriceX96, tick, protocolFee, lpFee] =
      await stateView.read.getSlot0([poolId]);

    return {
      sqrtPriceX96,
      tick,
      protocolFee,
      lpFee,
    };
  } catch (error) {
    console.error("Error fetching pool state:", error);
    return null;
  }
};

// Get the position info of a pool with a specific position ID
export const getPositionInfoWithPositionID = async (
  stateView,
  poolId,
  positionId
) => {
  try {
    const [liquidity, feeGrowthInside0LastX128, feeGrowthInside1LastX128] =
      await stateView.read.getPositionInfo(poolId, positionId);

    return {
      liquidity,
      feeGrowthInside0LastX128,
      feeGrowthInside1LastX128,
    };
  } catch (error) {
    console.error("Error fetching position info:", error);
    return null;
  }
};

// Get the position info of a pool with a specific position ID
export const getPositionInfoWithPositionDetails = async (
  stateView,
  poolId,
  owner,
  tickLower,
  tickUpper,
  salt
) => {
  try {
    const [liquidity, feeGrowthInside0LastX128, feeGrowthInside1LastX128] =
      await stateView.read.getPositionInfo(
        poolId,
        owner,
        tickLower,
        tickUpper,
        salt
      );

    return {
      liquidity,
      feeGrowthInside0LastX128,
      feeGrowthInside1LastX128,
    };
  } catch (error) {
    console.error("Error fetching position info:", error);
    return null;
  }
};

// Get the poolManager address
export const getPoolManager = async (stateView) => {
  try {
    const poolManager = await stateView.read.poolManager();

    return poolManager;
  } catch (error) {
    console.error("Error fetching pool manager address:", error);
    return null;
  }
};

// Get the tick liquidity
export const getTickLiquidity = async (stateView, poolId, tick) => {
  try {
    const [liquidityGross, liquidityNet] =
      await stateView.read.getTickLiquidity(poolId, tick);

    return {
      liquidityGross,
      liquidityNet,
    };
  } catch (error) {
    console.error("Error fetching tick liquidity:", error);
    return null;
  }
};

// Get the tick info
export const getTickInfo = async (stateView, poolId, tick) => {
  try {
    const [
      liquidityGross,
      liquidityNet,
      feeGrowthOutside0X128,
      feeGrowthOutside1X128,
    ] = await stateView.read.getTickInfo(poolId, tick);

    return {
      liquidityGross,
      liquidityNet,
      feeGrowthOutside0X128,
      feeGrowthOutside1X128,
    };
  } catch (error) {
    console.error("Error fetching tick info:", error);
    return null;
  }
};

// Get the fee growth outside a tick range of a pool
export const getTickFeeGrowthOutside = async (stateView, poolId, tick) => {
  try {
    const [feeGrowthOutside0X128, feeGrowthOutside1X128] =
      await stateView.read.getTickFeeGrowthOutside(poolId, tick);

    return {
      feeGrowthOutside0X128,
      feeGrowthOutside1X128,
    };
  } catch (error) {
    console.error("Error fetching fee growth outside tick range:", error);
    return null;
  }
};

// Get the global fee growth of a pool
export const getFeeGrowthGlobals = async (stateView, poolId) => {
  try {
    const [feeGrowthGlobal0, feeGrowthGlobal1] =
      await stateView.read.getFeeGrowthGlobals(poolId);

    return {
      feeGrowthGlobal0,
      feeGrowthGlobal1,
    };
  } catch (error) {
    console.error("Error fetching global fee growth:", error);
    return null;
  }
};

// Get the tick bitmap of a pool at a specific tick
export const getTickBitmap = async (stateView, poolId, tick) => {
  try {
    const tickBitmap = await stateView.read.getTickBitmap(poolId, tick);

    return tickBitmap;
  } catch (error) {
    console.error("Error fetching tick bitmap:", error);
    return null;
  }
};

// Get the liquidity of a position
export const getPositionLiquidity = async (stateView, poolId, positionId) => {
  try {
    const liquidity = await stateView.read.getPositionLiquidity(
      poolId,
      positionId
    );

    return liquidity;
  } catch (error) {
    console.error("Error fetching position liquidity:", error);
    return null;
  }
};

// Get the fee growth inside a tick range of a pool
export const getFeeGrowthInside = async (
  stateView,
  poolId,
  tickLower,
  tickUpper
) => {
  try {
    const [feeGrowthInside0X128, feeGrowthInside1X128] =
      await stateView.read.getFeeGrowthInside(poolId, tickLower, tickUpper);

    return {
      feeGrowthInside0X128,
      feeGrowthInside1X128,
    };
  } catch (error) {
    console.error("Error fetching fee growth inside tick range:", error);
    return null;
  }
};
