// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

interface IWeth {
    function deposit() external payable;

    function withdraw(uint amount) external;

    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address receipt, uint amount) external returns (uint);

    function allowance(address spender, uint amount) external returns (bool);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address spender,
        address recipient,
        uint amout
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approve(address indexed owner, address indexed spender, uint value);
}
