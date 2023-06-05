// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Xdd is ERC20 {
    constructor() ERC20("Xdd", "XD") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}
