import { createPublicClient, http, getContract } from "viem";

// Initialize the client
export const initializeClient = (chain, rpcUrl) => {
  return createPublicClient({
    chain: chain,
    transport: http(rpcUrl)
  });
}

// Set up a contract instance
export const setUpContract = (contractAddress, contractABI, client) => {
  return getContract({
    address: contractAddress,
    abi: contractABI,
    client: client
  })
}