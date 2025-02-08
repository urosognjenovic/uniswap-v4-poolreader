import dotenv from "dotenv";
dotenv.config();
import { mainnet, base } from "viem/chains";
import { initializeClient, setUpStateView } from "./utils/client.js";
import { getPoolManager, getPoolLiquidity, getPoolState } from "./utils/getters.js";
import { MAINNET_STATE_VIEW_ADDRESS, BASE_STATE_VIEW_ADDRESS } from "../constants/addresses.js";
import { STATE_VIEW_ABI } from "../constants/abi.js";

const main = async() => {
  const mainnetPoolId = "0x21C67E77068DE97969BA93D4AAB21826D33CA12BB9F565D8496E8FDA8A82CA27";
  const basePoolId = "0x74B1EB0EB9068ED54B6B9D55673F7DE8FAC3299CE7E3DF916E0172676D225A1A";

  const client = initializeClient(mainnet, process.env.MAINNET_RPC_URL);
  const stateView = setUpStateView(MAINNET_STATE_VIEW_ADDRESS, STATE_VIEW_ABI, client);

  const poolManager = await getPoolManager(stateView);
  console.log("poolManager:", poolManager);
  
  const liquidity = await getPoolLiquidity(stateView, mainnetPoolId);
  console.log("liquidity:", liquidity);

  const {
    sqrtPriceX96,
    tick, 
    protocolFee, 
    lpFee
  } = await getPoolState(stateView, mainnetPoolId);

  console.log(
    "sqrtPriceX96:", sqrtPriceX96,
    "tick:", tick,
    "protocolFee:", protocolFee,
    "lpFee:", lpFee
  );
}

main();