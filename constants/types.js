export function createPoolKey({
  currency0 = "0x0000000000000000000000000000000000000000",
  currency1 = "0x0000000000000000000000000000000000000000",
  fee = 3000,
  tickSpacing = 60,
  hooks = "0x0000000000000000000000000000000000000000",
}) {
  return {
    currency0,
    currency1,
    fee,
    tickSpacing,
    hooks,
  };
}
