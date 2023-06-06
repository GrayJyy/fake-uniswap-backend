import { DeployFunction } from 'hardhat-deploy/dist/types'
import { WAIT_CONFIRMATIONS } from '../constants/constant'
import { developChain } from '../helperHardhatConfig'
import verify from '../utils/verify'

const XddTokenDeploy: DeployFunction = async ({ deployments, getNamedAccounts, network }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const args: any[] = []
  const waitConfirmations = developChain.includes(network.name) ? 1 : WAIT_CONFIRMATIONS
  const xddToken = await deploy('ERC20Xdd', {
    from: deployer,
    args,
    log: true,
    waitConfirmations,
  })
  log(
    `Deployed xddToken contract at address: ${xddToken.address} ,the network is ${network.name},the deployer is ${deployer}`
  )
  log('---------------------------------------------------------------------------------------------')
  if (!developChain.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    verify(xddToken.address, args)
  }
}

XddTokenDeploy.tags = ['all', 'xddtoken']
export default XddTokenDeploy
