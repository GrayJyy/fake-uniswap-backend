import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'
import 'hardhat-deploy'
import useProxyAgent from './utils/useProxyAgent'
import { GAS, GAS_PRICE } from './constants/constant'

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY!
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL!

useProxyAgent()

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: { chainId: 31337, forking: { url: MAINNET_RPC_URL } },
    sepolia: { chainId: 11155111, url: SEPOLIA_RPC_URL, accounts: [PRIVATE_KEY], gasPrice: GAS_PRICE, gas: GAS },
    mainnet: { chainId: 1, url: MAINNET_RPC_URL, accounts: [PRIVATE_KEY], gasPrice: GAS_PRICE, gas: GAS },
  },
  namedAccounts: { deployer: { default: 0, 1: 0 }, user: { default: 1 } },
  etherscan: { apiKey: ETHERSCAN_API_KEY },
  gasReporter: { enabled: false },
  mocha: { timeout: 500000 },
}

export default config
