pragma solidity ^0.4.18;

// base contract to allow other contracts to inherit from this contract.
contract Owned {
    address owner;
    // constructor method to set the 'owner' variable to the address that created the contract.
    // the owned function will contain the contract creator's address and give it to the "owner" variable.
    function Owned() public {
        owner = msg.sender;
    }
    // modifier to require the owner for functions associated with it; permissions.
    // for example: setting the instructor will need this modifider.
    modifier ownerOnly {
        require(msg.sender == owner);
        _;
    }
}

// 'is Owned' (name of base contract) after the contract name.
//is how you have a contract inherit code from another contract.

contract Instructor is Owned {
    // structs allow you to make a 'blueprint' or structor for contract properties.
    // it can be thought of as an object.
    struct Instructor {
        uint age;
        bytes16 fName;
        bytes16 lName;
    }
    // this code maps the address array to the instructor struct above 
    // and assigns the mapping to a variable called 'instructors'.
    // then it takes the address array and puts it inside the instructorAccts array.
    mapping (address => Instructor) instructors;
    address[] public instructorAccts;
    
    event instructorInfo(
        bytes16 fName,
        bytes16 lName,
        uint age
    );
    
    function setInstructor (address _address, uint _age, bytes16 _fName, bytes16 _lName) ownerOnly public {
        Instructor storage instructor = instructors[_address];
        
        instructor.age = _age;
        instructor.fName = _fName;
        instructor.lName = _lName;
        
        instructorAccts.push(_address) -1;
        instructorInfo(_fName, _lName, _age);
    }
    
    function getInstructors() view public returns (address[]) {
        return instructorAccts;
    }
    
    function getInstructor(address _address) view public returns (uint, bytes16, bytes16) {
        return (instructors[_address].age, instructors [_address].fName, instructors[_address].lName);
    }
    
    function countInstructors() view public returns (uint) {
        return instructorAccts.length;
    }
}
