import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const wagmiConfig = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
});

export default wagmiConfig;