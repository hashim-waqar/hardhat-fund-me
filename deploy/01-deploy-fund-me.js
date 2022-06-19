// function deployFunc() {
//     console.log("hi")
//    hre.getNamedAccounts
//    hre.deployments
// }
// module.exports.default = deployFunc
//////////////////////////////////////
// module.exports = async (hre) => {
//     const { getNameAccounts, deployments } = hre
// }
////////////////////////////
const { networkConfig, developmentChain } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const address = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"

    // const ethUSDPriceFeedAddress = networkConfig[chainId]["ethUSDPriceFeed"]
    let ethUSDPriceFeedAddress
    if (developmentChain.includes(network.name)) {
        const ethUSDAggregator = await deployments.get("MockV3Aggregator")
        ethUSDPriceFeedAddress = ethUSDAggregator.address
    } else {
        ethUSDPriceFeedAddress = networkConfig[chainId]["ethUSDPriceFeed"]
    }
    args = [ethUSDPriceFeedAddress]
    //when going for localhost or hardhat we want to use mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChain.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("-------------------------------")
}

module.exports.tags = ["all", "FundMe"]
