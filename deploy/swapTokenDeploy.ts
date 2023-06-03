import { DeployFunction } from 'hardhat-deploy/dist/types'
import { WAIT_CONFIRMATIONS } from '../constants/constant'
import { developChain } from '../helperHardhatConfig'
import verify from '../utils/verify'

const swapTokenDeploy: DeployFunction = async ({ deployments, getNamedAccounts, network }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const args = ['0xE592427A0AEce92De3Edee1F18E0157C05861564']
  const waitConfirmations = developChain.includes(network.name) ? 1 : WAIT_CONFIRMATIONS
  const swapToken = await deploy('SwapToken', {
    from: deployer,
    args,
    log: true,
    waitConfirmations,
  })
  log(`Deployed AiNft contract at address: ${swapToken.address} ,the network is ${network.name}`)
  log('---------------------------------------------------------------------------------------------')
  if (!developChain.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    verify(swapToken.address, args)
  }
}

swapTokenDeploy.tags = ['all', 'swaptoken']
export default swapTokenDeploy
