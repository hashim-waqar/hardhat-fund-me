const { getNamedAccounts, ethers, network } = require("hardhat")
const { assert } = require("chai")
const { developmentChain } = require("./../../helper-hardhat-config")
console.log("woo")
developmentChain.includes(network.name)
    ? describe.skip
    : describe("fundme", async function () {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("0.1")
          console.log("woo")
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
              console.log("woo")
          })
          it("allows people to withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              console.log("funded")
              await fundMe.withdraw()
              console.log("withdrawed")
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(endingBalance.toString())
              assert.equal(endingBalance.toString(), "0")
          })
      })
