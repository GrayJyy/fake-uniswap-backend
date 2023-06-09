import { deployments, ethers, getNamedAccounts, network } from 'hardhat'
import { DAI_ADDRESS, WETH9_ADDRESS, USDC_ADDRESS } from '../../constants/constant'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { IWeth, SwapToken } from '../../typechain-types'
import { developChain } from '../../helperHardhatConfig'
import { assert, expect } from 'chai'

!developChain.includes(network.name)
  ? describe.skip
  : describe('SwapToken', () => {
      let swapToken: SwapToken
      let signer: SignerWithAddress
      let weth: IWeth
      let dai: IWeth
      let usdc: IWeth
      beforeEach(async () => {
        const { deployer, user } = await getNamedAccounts()
        signer = await ethers.getSigner(deployer)
        await deployments.fixture(['swaptoken'])
        swapToken = await ethers.getContract('SwapToken')
        weth = await ethers.getContractAt('IWeth', WETH9_ADDRESS)
        dai = await ethers.getContractAt('IWeth', DAI_ADDRESS)
        usdc = await ethers.getContractAt('IWeth', USDC_ADDRESS)
      })
      describe('constructor', () => {
        it('Should gets the correct swapRouter', async () => {
          const swapRouter = await swapToken.swapRouter()
          assert.equal(swapRouter, '0xE592427A0AEce92De3Edee1F18E0157C05861564')
        })
      })

      describe('swapExactInputSingle', () => {
        it('Should gets the dai token and reset all weth token correctly', async () => {
          const amount = ethers.utils.parseEther('0.01')
          await weth.deposit({ value: amount })
          await weth.approve(swapToken.address, amount)
          await swapToken.swapExactInputSingle(amount)
        })
      })
      describe('swapExactOutputSingle', () => {
        it('Should output the certain dai amount and refund the remain weth', async () => {
          const amountInMaximum = ethers.utils.parseEther('0.1')
          await weth.deposit({ value: amountInMaximum })
          await weth.approve(swapToken.address, amountInMaximum)
          const amountOut = ethers.utils.parseEther('1')
          await swapToken.swapExactOutputSingle(amountOut, amountInMaximum)
        })
      })
    })
