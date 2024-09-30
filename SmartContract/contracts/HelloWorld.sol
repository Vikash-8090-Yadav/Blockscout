// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    // Declare a variable `o` to store the message
    string public oooo;

    // Constructor to set the initial message to "Hello, World!"
    constructor() {
        oooo = "Hello, World!";
    }

    // Function to return the message
    function getMessage() public view returns (string memory) {
        return oooo;
    }
}
