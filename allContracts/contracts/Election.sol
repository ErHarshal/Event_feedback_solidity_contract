pragma solidity ^0.4.25;

contract feedback {
    struct register {
        string name;
        string email;
        bool isRegister;
    }
    
    int sumFeed1;
    int sumFeed2;
    int sumFeed3;
    int numberOfUser = 0;
    address owner;
    constructor(){
        owner = msg.sender;
    }
    
    struct Feedback {
        int f1;
        int f2;
        int f3;
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
    
    function addFeedback(int _f1, int _f2, int _f3) public checkRegisterUser{
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
    
    function getFeedback() public view returns(int,int,int){
        return(responses[msg.sender].opinion.f1,responses[msg.sender].opinion.f2,responses[msg.sender].opinion.f3);
    }
    
    function addUser(address _addr, string _name, string _email) public {
        user[_addr].name = _name;
        user[_addr].email = _email;
        user[_addr].isRegister = true;
    }
    
    function getAverageFeedback() onlyOwner public view returns(int,int,int){
        return (sumFeed1/numberOfUser,sumFeed2/numberOfUser,sumFeed3/numberOfUser);
    }
    
    function transferMoneyToInstructor() onlyOwner public view returns(int) {
        int totalAvg = sumFeed1/numberOfUser + sumFeed2/numberOfUser + sumFeed3/numberOfUser;
        totalAvg = totalAvg % 5;
        if(totalAvg == 1 )    
            return 20;
        else if(totalAvg == 2)
            return 40;
        else if(totalAvg == 3)
            return 60;
        else if(totalAvg == 4)
            return 80;
        else if(totalAvg == 5)
            return 100;
        else 
            return 0;
    }
}
