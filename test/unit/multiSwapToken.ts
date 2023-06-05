import { deployments, ethers, getNamedAccounts, network } from 'hardhat'
import { DAI_ADDRESS, WETH9_ADDRESS, USDC_ADDRESS } from '../../constants/constant'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { IWeth } from '../../typechain-types'
import { developChain } from '../../helperHardhatConfig'
import { assert, expect } from 'chai'
import { SwapMultihop } from '../../typechain-types/contracts/SwapMultihop'

!developChain.includes(network.name)
  ? describe.skip
  : describe('SwapMultihop', () => {
      let swapMultihop: SwapMultihop
      let signer: SignerWithAddress
      let weth: IWeth
      let dai: IWeth
      let usdc: IWeth
      beforeEach(async () => {
        const { deployer, user } = await getNamedAccounts()
        signer = await ethers.getSigner(deployer)
        await deployments.fixture(['swapmultihop'])
        swapMultihop = await ethers.getContract('SwapMultihop')
        weth = await ethers.getContractAt('IWeth', WETH9_ADDRESS)
        dai = await ethers.getContractAt('IWeth', DAI_ADDRESS)
        usdc = await ethers.getContractAt('IWeth', USDC_ADDRESS)
      })
      describe('constructor', () => {
        it('Should gets the correct swapRouter', async () => {
          const swapRouter = await swapMultihop.swapRouter()
          assert.equal(swapRouter, '0xE592427A0AEce92De3Edee1F18E0157C05861564')
        })
      })

      describe('swapExactInputMultihop', () => {
        it('Should gets the dai token and reset all weth token correctly', async () => {
          const amount = ethers.utils.parseEther('0.01')
          await weth.deposit({ value: amount })
          await weth.approve(swapMultihop.address, amount)
          await swapMultihop.swapExactInputMultihop(amount)
        })
      })
      describe('swapExactOutputMultihop', () => {
        it('Should output the certain dai amount and refund the remain weth', async () => {
          const amountInMaximum = ethers.utils.parseEther('0.1')
          await weth.deposit({ value: amountInMaximum })
          await weth.approve(swapMultihop.address, amountInMaximum)
          const amountOut = ethers.utils.parseEther('1')
          await swapMultihop.swapExactOutputMultihop(amountOut, amountInMaximum)
        })
      })
    })
