const { developmentChains } = require("../helper-hardhat-config");
const { network } = require("hardhat");

const BASE_FEE = ethers.utils.parseEther("0.25");
const GAS_PRICE_LINK = 1e9; //1000000000 // link per gas. Calculated value based on the price of the chain.

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, logs } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [BASE_FEE, GAS_PRICE_LINK];

    if (developmentChains.includes(network.name)) {
        console.log("Local network detected! going to deploy mocks...");
        // deploy a mock vrfcoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        });
        console.log("Mocks deployed!");
        console.log("===========================");
    }
};

module.exports.tags = ["all", "mocks"];
