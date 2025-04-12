import dotenv from "dotenv";
dotenv.config();
import { mainnet, base } from "viem/chains";
import { initializeClient, setUpContract } from "./utils/client.js";
import {
  getPoolManager,
  getPoolLiquidity,
  getPoolState,
} from "./utils/gettersStateView.js";
import { createPoolKey } from "../constants/types.js";
import { getPoolIdFromPoolKey } from "./utils/poolId.js";
import { getPoolKeys } from "./utils/gettersPositionManager.js";
import {
  ETHEREUM_STATE_VIEW_ADDRESS,
  BASE_STATE_VIEW_ADDRESS,
  ETHEREUM_POSITION_MANAGER_ADDRESS,
} from "../constants/addresses.js";
import {
  STATE_VIEW_ABI,
  POSITION_MANAGER_ABI,
  ERC20_ABI,
} from "../constants/abi.js";
import { convertFeeToPercent, calculatePrice } from "./utils/helpers.js";

const main = async () => {
  const CURRENCY0 = "0x558AFaF6FeF52395D558F9fc1ab18A08C7A7548b";
  const CURRENCY1 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const FEE = 10000;
  const TICK_SPACING = 60;
  const HOOKS = "0x0000000000000000000000000000000000000000";

  const poolKey = createPoolKey({
    currency0: CURRENCY0,
    currency1: CURRENCY1,
    fee: FEE,
    tickSpacing: TICK_SPACING,
    hooks: HOOKS,
  });
  const poolId = getPoolIdFromPoolKey(poolKey);

  console.log("poolId: ", poolId);

  const ethereumPoolId =
    "0x21C67E77068DE97969BA93D4AAB21826D33CA12BB9F565D8496E8FDA8A82CA27";
  const basePoolId =
    "0x74B1EB0EB9068ED54B6B9D55673F7DE8FAC3299CE7E3DF916E0172676D225A1A";
  const client = initializeClient(mainnet, process.env.ETHEREUM_RPC_URL);
  const stateView = setUpContract(
    ETHEREUM_STATE_VIEW_ADDRESS,
    STATE_VIEW_ABI,
    client
  );
  const positionManager = setUpContract(
    ETHEREUM_POSITION_MANAGER_ADDRESS,
    POSITION_MANAGER_ABI,
    client
  );

  const poolManager = await getPoolManager(stateView);

  if (poolManager) {
    console.log("poolManager:", poolManager);
  }

  const liquidity = await getPoolLiquidity(stateView, ethereumPoolId);

  if (liquidity) {
    console.log("liquidity:", liquidity);
  }

  let sqrtPriceX96 = 0n;
  let tick;
  let protocolFee;
  let lpFee;
  const poolState = await getPoolState(stateView, ethereumPoolId);

  if (poolState) {
    ({ sqrtPriceX96, tick, protocolFee, lpFee } = poolState);

    console.log(
      "sqrtPriceX96:",
      sqrtPriceX96,
      "tick:",
      tick,
      "protocolFee:",
      convertFeeToPercent(protocolFee),
      "lpFee:",
      convertFeeToPercent(lpFee)
    );
  }

  const poolKeys = await getPoolKeys(positionManager, ethereumPoolId);

  if (poolKeys) {
    const { currency0, currency1, fee, tickSpacing, hooks } = poolKeys;

    console.log(
      "currency0:",
      currency0,
      "currency1:",
      currency1,
      "fee:",
      fee,
      "tickSpacing:",
      tickSpacing,
      "hooks:",
      hooks
    );
  }

  const price = await calculatePrice(
    client,
    ERC20_ABI,
    sqrtPriceX96,
    "0x0000000000000000000000000000000000000000",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  );
  if (price) {
    console.log("price:", price);
  }
};

main();
