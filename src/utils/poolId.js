import { keccak256, encodeAbiParameters } from "viem";

export const getPoolIdFromPoolKey = (poolKey) => {
  const { currency0, currency1, fee, tickSpacing, hooks } = poolKey;

  const encoded = encodeAbiParameters(
    [
      { name: "currency0", type: "address" },
      { name: "currency1", type: "address" },
      { name: "fee", type: "uint24" },
      { name: "tickSpacing", type: "int24" },
      { name: "hooks", type: "address" },
    ],
    [currency0, currency1, fee, tickSpacing, hooks]
  );

  return keccak256(encoded);
};
