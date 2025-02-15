import { isAddressEqual } from "viem";
import { setUpContract } from "./client.js";
import { ZERO_ADDRESS } from "../../constants/constants.js";

// Convert fee to percent (i.e. if fee = 500, the function returns "0.05%")
export const convertFeeToPercent = (fee) => {
  return fee / 10_000 + "%";
};

export const calculatePrice = async (
  client,
  ERC20_ABI,
  sqrtPriceX96,
  token0Address,
  token1Address
) => {
  const token0Decimals = isAddressEqual(token0Address, ZERO_ADDRESS)
    ? 18
    : await getTokenDecimals(token0Address, ERC20_ABI, client);
  const token1Decimals = isAddressEqual(token1Address, ZERO_ADDRESS)
    ? 18
    : await getTokenDecimals(token1Address, ERC20_ABI, client);

  const decimalFactor = BigInt(10 ** (token0Decimals - token1Decimals));

  return ((sqrtPriceX96 * decimalFactor) / 2n ** 96n) ** 2n / decimalFactor;
};

export const getTokenDecimals = async (tokenAddress, ERC20_ABI, client) => {
  const token = setUpContract(tokenAddress, ERC20_ABI, client);

  try {
    const decimals = await token.read.decimals();

    return decimals;
  } catch (error) {
    console.error("Error fetching token decimals:", error);
    return null;
  }
};
