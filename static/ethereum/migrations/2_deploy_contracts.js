var Instructor = artifacts.require('./Instructor.sol');

module.exports = function(deployer) {
    deployer.deploy(Instructor);
}
