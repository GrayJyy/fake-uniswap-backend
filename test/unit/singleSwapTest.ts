import { deployments, ethers, getNamedAccounts, network } from 'hardhat'
import { DAI_ADDRESS, WETH9_ADDRESS, USDC_ADDRESS } from '../../constants/constant'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { SwapToken } from '../../typechain-types'
import { developChain } from '../../helperHardhatConfig'

!developChain.includes(network.name)
  ? describe.skip
  : describe('SwapToken', () => {
      let swapToken: SwapToken
      let signer: SignerWithAddress
      beforeEach(async () => {
        const { deployer } = await getNamedAccounts()
        signer = await ethers.getSigner(deployer)
        await deployments.fixture(['swapToken'])
      })
      describe('constructor', async () => {})
    })
