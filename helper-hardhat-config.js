const networkConfig = {
    4: {
        name: "rinkeby",
        ethUSDPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
    137: {
        name: "polygon",
        ethUSDPriceFeed: " 	0x72484B12719E23115761D5DA1646945632979bB6",
    },
}

const developmentChain = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 20000000000
module.exports = {
    networkConfig,
    developmentChain,
    DECIMALS,
    INITIAL_ANSWER,
}
