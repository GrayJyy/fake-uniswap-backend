import { ProxyAgent, setGlobalDispatcher } from 'undici'

const useProxyAgent = () => {
  const proxyAgent = new ProxyAgent('http://127.0.0.1:7890')
  setGlobalDispatcher(proxyAgent)
}

export default useProxyAgent
