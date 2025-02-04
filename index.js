import dotenv from "dotenv";
dotenv.config();
import { createPublicClient, getContract, http } from "viem";
import { mainnet } from "viem/chains";
import { MAINNET_STATE_VIEW_ADDRESS, STATE_VIEW_ABI } from "./constants.js";

const poolId = "0x21C67E77068DE97969BA93D4AAB21826D33CA12BB9F565D8496E8FDA8A82CA27";

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
  const liquidity = await stateView.read.getLiquidity([poolId]);
  console.log("Pool liquidity:", liquidity.toString());
}

getPoolLiquidity(poolId);