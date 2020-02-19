pragma solidity ^0.4.25;

contract feedback {
    struct register {
        string name;
        string email;
        bool isRegister;
    }
    
    uint sumFeed1;
    uint sumFeed2;
    uint sumFeed3;
    uint numberOfUser = 0;
    address owner;
    uint public value;
    uint public totalAvg;
    address public instructor;
    constructor (address _addr) payable{
        owner = msg.sender;//instructor
        instructor = _addr;
    }
    
    struct Feedback {
        uint f1;
        uint f2;
        uint f3;//uint
    }

    struct response {
        Feedback opinion;
        bool isFeedbackGiven;
    }
    
    mapping(address => response) responses;
    mapping(address => register) user;
    
    // function checkRegisterUser(address _addr)
    // {
    //     assert(user[address].isRegister == true);
    //     _;
    // }
    
    modifier checkRegisterUser() {
    require(
        user[msg.sender].isRegister == true,
        "Only registered user can call this."
    );
    _;
    }
    
    modifier onlyOwner() {
    require(
        msg.sender == owner,
        "Only owner can call this."
    );
    _;
    }
    
    function addFeedback(uint _f1, uint _f2, uint _f3) public checkRegisterUser{
        numberOfUser = numberOfUser + 1;
        responses[msg.sender].opinion.f1=_f1;
        responses[msg.sender].opinion.f2=_f2;
        responses[msg.sender].opinion.f3=_f3;
        responses[msg.sender].isFeedbackGiven = true;
        sumFeed1 = sumFeed1 + _f1;
        sumFeed2 = sumFeed2 + _f2;
        sumFeed3 = sumFeed3 + _f3;
    }
    
    function isFeedbackGivens() public view returns(bool){
        return responses[msg.sender].isFeedbackGiven;
    }
    
    function getFeedback() public view returns(uint,uint,uint){
        return(responses[msg.sender].opinion.f1,responses[msg.sender].opinion.f2,responses[msg.sender].opinion.f3);
    }
    
    function addUser(address _addr, string _name, string _email) public {
        user[_addr].name = _name;
        user[_addr].email = _email;
        user[_addr].isRegister = true;
    }
    
    function getAverageFeedback() onlyOwner public view returns(uint,uint,uint){
        return (sumFeed1/numberOfUser,sumFeed2/numberOfUser,sumFeed3/numberOfUser);
    }
    
    // function transferMoneyToInstructor() onlyOwner public payable {
    //     uint totalAvg = sumFeed1/numberOfUser + sumFeed2/numberOfUser + sumFeed3/numberOfUser;
    //     totalAvg = totalAvg % 5;
    //     if(totalAvg == 1 )    
    //         instructor.transfer(20);
    //     else if(totalAvg == 2)
    //         instructor.send(40);
    //     else if(totalAvg == 3)
    //         instructor.send(60);
    //     else if(totalAvg == 4)
    //         instructor.send(80);
    //     else if(totalAvg == 5)
    //     instructor.send(100);
    // }
    
    function transferMoneyToInstructor() public payable returns (bool) {
        totalAvg = sumFeed1/numberOfUser + sumFeed2/numberOfUser + sumFeed3/numberOfUser;
        value;
        totalAvg = totalAvg % 5;
        if(totalAvg == 1 )    
            value = 20;
        else if(totalAvg == 2)
            value = 40;
        else if(totalAvg == 3)
            value = 60;
        else if(totalAvg == 4)
            value = 80;
        else if(totalAvg == 5)
            value = 100;
             if (!address(instructor).send(value)) {
         return false;
        }
            return true;
                
    }
}
