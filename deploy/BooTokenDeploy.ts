import { DeployFunction } from 'hardhat-deploy/dist/types'
import { WAIT_CONFIRMATIONS } from '../constants/constant'
import { developChain } from '../helperHardhatConfig'
import verify from '../utils/verify'

const BooTokenDeploy: DeployFunction = async ({ deployments, getNamedAccounts, network }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const args: any[] = []
  const waitConfirmations = developChain.includes(network.name) ? 1 : WAIT_CONFIRMATIONS
  const booToken = await deploy('ERC20Boo', {
    from: deployer,
    args,
    log: true,
    waitConfirmations,
  })
  log(
    `Deployed booToken contract at address: ${booToken.address} ,the network is ${network.name},the deployer is ${deployer}`
  )
  log('---------------------------------------------------------------------------------------------')
  if (!developChain.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    verify(booToken.address, args)
  }
}

BooTokenDeploy.tags = ['all', 'bootoken']
export default BooTokenDeploy
