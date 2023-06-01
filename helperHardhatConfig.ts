export type networkConfigType = { [key: number]: CertainConfigType }
export type CertainConfigType = { name: string }

const networkConfig: networkConfigType = {
  31337: { name: 'localhost' },
  11155111: { name: 'sepolia' },
}
const developChain = ['localhost', 'hardhat']

export { networkConfig, developChain }
