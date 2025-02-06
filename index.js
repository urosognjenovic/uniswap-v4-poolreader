import dotenv from "dotenv";
dotenv.config();
import { createPublicClient, http, getContract } from "viem";
import { mainnet, base } from "viem/chains";
import { MAINNET_STATE_VIEW_ADDRESS, BASE_STATE_VIEW_ADDRESS, STATE_VIEW_ABI } from "./constants.js";

const mainnetPoolId = "0x21C67E77068DE97969BA93D4AAB21826D33CA12BB9F565D8496E8FDA8A82CA27";
const basePoolId = "0x74B1EB0EB9068ED54B6B9D55673F7DE8FAC3299CE7E3DF916E0172676D225A1A";

// Initialize the client
const client = createPublicClient({
  chain: mainnet, 
  transport: http(process.env.MAINNET_RPC_URL),
});

// Set up StateView contract instance
const stateView = getContract({
  address: MAINNET_STATE_VIEW_ADDRESS,
  abi: STATE_VIEW_ABI,
  client, 
});

// Get the total liquidity of the pool
const getPoolLiquidity = async (poolId) => {
  try {
    const liquidity = await stateView.read.getLiquidity([poolId]);
    
    return liquidity;
  } catch (error) {
    console.error("Error fetching pool liquidity:", error);
  }
}

// Get the pool state 
const getPoolState = async (poolId) => {
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
};

const main = async() => {
  getPoolState(mainnetPoolId);
  getPoolLiquidity(mainnetPoolId);
}

main();