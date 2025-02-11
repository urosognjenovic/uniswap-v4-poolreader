import dotenv from "dotenv";
dotenv.config();
import { mainnet, base } from "viem/chains";
import { initializeClient, setUpContract } from "./utils/client.js";
import { getPoolManager, getPoolLiquidity, getPoolState } from "./utils/gettersStateView.js";
import { getPoolKeys } from "./utils/gettersPositionManager.js";
import { ETHEREUM_STATE_VIEW_ADDRESS, BASE_STATE_VIEW_ADDRESS, ETHEREUM_POSITION_MANAGER_ADDRESS } from "../constants/addresses.js";
import { STATE_VIEW_ABI, POSITION_MANAGER_ABI } from "../constants/abi.js";

const main = async() => {
  const ethereumPoolId = "0x21C67E77068DE97969BA93D4AAB21826D33CA12BB9F565D8496E8FDA8A82CA27";
  const basePoolId = "0x74B1EB0EB9068ED54B6B9D55673F7DE8FAC3299CE7E3DF916E0172676D225A1A";

  const client = initializeClient(mainnet, process.env.ETHEREUM_RPC_URL);
  const stateView = setUpContract(ETHEREUM_STATE_VIEW_ADDRESS, STATE_VIEW_ABI, client);
  const positionManager = setUpContract(ETHEREUM_POSITION_MANAGER_ADDRESS, POSITION_MANAGER_ABI, client);

  const poolManager = await getPoolManager(stateView);
  console.log("poolManager:", poolManager);
  
  const liquidity = await getPoolLiquidity(stateView, ethereumPoolId);
  console.log("liquidity:", liquidity);

  const {
    sqrtPriceX96,
    tick, 
    protocolFee, 
    lpFee
  } = await getPoolState(stateView, ethereumPoolId);
  console.log(
    "sqrtPriceX96:", sqrtPriceX96,
    "tick:", tick,
    "protocolFee:", protocolFee,
    "lpFee:", lpFee
  );

  const {
    currency0,
    currency1,
    fee,
    tickSpacing,
    hooks
  } = await getPoolKeys(positionManager, ethereumPoolId);
  console.log(
    "currency0:", currency0,
    "currency1:", currency1,
    "fee:", fee,
    "tickSpacing:", tickSpacing,
    "hooks:", hooks
  );
}

main();