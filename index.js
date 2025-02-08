import dotenv from "dotenv";
dotenv.config();
import { createPublicClient, http, getContract } from "viem";
import { mainnet, base } from "viem/chains";
import { MAINNET_STATE_VIEW_ADDRESS, BASE_STATE_VIEW_ADDRESS, STATE_VIEW_ABI } from "./constants.js";

// Initialize the client
const initializeClient = (chain, rpcUrl) => {
  return createPublicClient({
    chain: chain,
    transport: http(rpcUrl)
  });
}

// Set up StateView contract instance
const setUpStateView = (stateViewAddress, stateViewABI, client) => {
  return getContract({
    address: stateViewAddress,
    abi: stateViewABI,
    client: client
  })
}

// Get the total liquidity of the pool
const getPoolLiquidity = async (stateView, poolId) => {
  try {
    const liquidity = await stateView.read.getLiquidity([poolId]);
    
    return liquidity;
  } catch (error) {
    console.error("Error fetching pool liquidity:", error);
  }
}

// Get the pool state 
const getPoolState = async (stateView, poolId) => {
  try {
    const [
      sqrtPriceX96,
      tick,
      protocolFee,
      lpFee
     ] = await stateView.read.getSlot0([poolId]);
  
    return {
      sqrtPriceX96,
      tick,
      protocolFee,
      lpFee
    };
  } catch(error) {
    console.log("Error fetching pool state:", error);
  }
};

// Get the position info
const getPositionInfo = async(stateView, poolId, positionId) => {
  try {
    const [
      liquidity,
      feeGrowthInside0LastX128,
      feeGrowthInside1LastX128
    ] = await stateView.read.getPositionInfo(poolId, positionId);

    return {
      liquidity,
      feeGrowthInside0LastX128,
      feeGrowthInside1LastX128
    };
  } catch(error) {
    console.log("Error fetching position info:", error);
  }
}

// Get the poolManager address
const getPoolManager = async(stateView) => {
  try {
    const poolManager = await stateView.read.poolManager();

    return poolManager;
  } catch(error) {
    console.log("Error fetching pool manager address:", error);
  }
}

// Get the tick liquidity
const getTickLiquidity = async(poolId, tick) => {
  try {
    const [
      liquidityGross,
      liquidityNet
    ] = await stateView.read.getTickLiquidity(poolId, tick);

    return {
      liquidityGross,
      liquidityNet
    };
  } catch(error) {
    console.log("Error fetching tick liquidity:", error);
  }
}

// Get the tick info
const getTickInfo = async(poolId, tick) => {
  try {
    [
      liquidityGross,
      liquidityNet,
      feeGrowthOutside0X128,
      feeGrowthOutside1X128
    ] = await stateView.read.getTickInfo(poolId, tick);

    return {
      liquidityGross,
      liquidityNet,
      feeGrowthInside0LastX128,
      feeGrowthInside1LastX128
    };
  } catch(error) {
    console.log("Error fetching tick info:", error);
  }
}

// Get the fee growth outside a tick range of a pool
const getTickFeeGrowthOutside = async(poolId, tick) => {
  try {
    [
      feeGrowthOutside0X128,
      feeGrowthOutside1X128
    ] = await stateView.read.getTickFeeGrowthOutside(poolId, tick);

    return {
      feeGrowthOutside0X128,
      feeGrowthOutside1X128
    };
  } catch(error) {
    console.log("Error fetching fee growth:", error);
  }
}

const main = async() => {
  const mainnetPoolId = "0x21C67E77068DE97969BA93D4AAB21826D33CA12BB9F565D8496E8FDA8A82CA27";
  const basePoolId = "0x74B1EB0EB9068ED54B6B9D55673F7DE8FAC3299CE7E3DF916E0172676D225A1A";

  const client = initializeClient(mainnet, process.env.MAINNET_RPC_URL);
  const stateView = setUpStateView(MAINNET_STATE_VIEW_ADDRESS, STATE_VIEW_ABI, client);

    const poolManager = await getPoolManager(stateView);
    console.log("poolManager:", poolManager);
  
  const liquidity = await getPoolLiquidity(stateView, mainnetPoolId);
  console.log("liquidity:", liquidity);

  const {
    sqrtPriceX96,
    tick, 
    protocolFee, 
    lpFee
  } = await getPoolState(stateView, mainnetPoolId);

  console.log(
    "sqrtPriceX96:", sqrtPriceX96,
    "tick:", tick,
    "protocolFee:", protocolFee,
    "lpFee:", lpFee
  );
}

main();