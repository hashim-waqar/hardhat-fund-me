const { getNamedAccounts, ethers } = require("hardhat")
async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("withdraw funds")
    const trasnsactionResponse = await fundMe.withdraw()
    await trasnsactionResponse.wait(1)
    console.log("withdraw done")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
