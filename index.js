import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { STATE_VIEW_ADDRESS, STATE_VIEW_ABI } from "./constants";

// Initialize the client
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Set up StateView contract instance
const stateView = getContract({
  address: STATE_VIEW_ADDRESS,
  abi: STATE_VIEW_ABI,
  client,
});
