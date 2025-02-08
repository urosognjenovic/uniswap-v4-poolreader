import { createPublicClient, http, getContract } from "viem";

// Initialize the client
export const initializeClient = (chain, rpcUrl) => {
  return createPublicClient({
    chain: chain,
    transport: http(rpcUrl)
  });
}

// Set up StateView contract instance
export const setUpStateView = (stateViewAddress, stateViewABI, client) => {
  return getContract({
    address: stateViewAddress,
    abi: stateViewABI,
    client: client
  })
}