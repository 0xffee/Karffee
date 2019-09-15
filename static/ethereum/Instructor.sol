pragma solidity ^0.4.18;

contract Instructor {
    
    //setting variables.
    bytes16 fName;
    bytes16 lName;
    uint age;
    address owner;
    
    // constructor method to set the owner variable to the address that created the contract.
    // the owner will contain the contract creator's address.
    function Nodegang() public {
        owner = msg.sender;
    }
    // modifier to require the owner for functions associated with it; permissions.
    // for example: setting the instructor will need this modifider. 
    modifier ownerOnly {
        require(msg.sender == owner);
        _;
    }
    
    event Instructorinfo (
        bytes16 fName,
        bytes16 lName,
        uint age
    );
    
    //this function takes two parameters to set the master name and age
    function setInstructor(bytes16 _fName, bytes16 _lName, uint _age) ownerOnly public {
        fName = _fName;
        lName = _lName;
        age = _age;
        emit Instructorinfo(_fName, _lName, _age);
    }
    //this function gets to the two parameters that were set using the  setMaster function
    function getInstructor() view public returns (bytes16, bytes16, uint) {
        return (fName, lName, age);
    }
}
