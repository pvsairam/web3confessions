// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title CryptoConfessions
 * @notice A privacy-preserving confession system using encrypted storage
 * @dev Stores encrypted confessions on-chain, supporting FHE (Fully Homomorphic Encryption)
 */
contract CryptoConfessions {
    struct Item {
        address author;
        bytes ciphertext;
        uint256 upvotes;
        uint256 timestamp;
    }

    Item[] public items;

    event Posted(
        uint256 indexed id,
        address indexed author,
        bytes ciphertext,
        uint256 timestamp
    );

    event Reacted(
        uint256 indexed id,
        address indexed by,
        bytes ciphertext
    );

    event Upvoted(
        uint256 indexed id,
        address indexed by,
        uint256 newTotal
    );

    /**
     * @notice Post a new encrypted confession
     * @param ciphertext The encrypted confession data
     * @return The ID of the newly created confession
     */
    function postConfession(bytes calldata ciphertext) external returns (uint256) {
        require(ciphertext.length > 0, "Empty ciphertext");

        items.push(Item({
            author: msg.sender,
            ciphertext: ciphertext,
            upvotes: 0,
            timestamp: block.timestamp
        }));

        uint256 id = items.length - 1;
        emit Posted(id, msg.sender, ciphertext, block.timestamp);

        return id;
    }

    /**
     * @notice React to a confession with an encrypted reaction
     * @param id The confession ID
     * @param ciphertext The encrypted reaction
     */
    function reactConfession(uint256 id, bytes calldata ciphertext) external {
        require(id < items.length, "Invalid confession ID");
        require(ciphertext.length > 0, "Empty reaction");

        emit Reacted(id, msg.sender, ciphertext);
    }

    /**
     * @notice Upvote a confession (public counter)
     * @param id The confession ID
     */
    function upvote(uint256 id) external {
        require(id < items.length, "Invalid confession ID");

        items[id].upvotes += 1;
        emit Upvoted(id, msg.sender, items[id].upvotes);
    }

    /**
     * @notice Get the total number of confessions
     * @return The total count
     */
    function count() external view returns (uint256) {
        return items.length;
    }

    /**
     * @notice Get confession details
     * @param id The confession ID
     * @return author The author's address
     * @return ciphertext The encrypted confession
     * @return upvotes The number of upvotes
     * @return timestamp When it was posted
     */
    function getConfession(uint256 id)
        external
        view
        returns (
            address author,
            bytes memory ciphertext,
            uint256 upvotes,
            uint256 timestamp
        )
    {
        require(id < items.length, "Invalid confession ID");

        Item memory item = items[id];
        return (item.author, item.ciphertext, item.upvotes, item.timestamp);
    }

    /**
     * @notice Get multiple confessions at once
     * @param startId Starting confession ID
     * @param limit Maximum number to fetch
     * @return An array of confessions
     */
    function getConfessions(uint256 startId, uint256 limit)
        external
        view
        returns (Item[] memory)
    {
        require(startId < items.length, "Invalid start ID");

        uint256 end = startId + limit;
        if (end > items.length) {
            end = items.length;
        }

        uint256 resultLength = end - startId;
        Item[] memory result = new Item[](resultLength);

        for (uint256 i = 0; i < resultLength; i++) {
            result[i] = items[startId + i];
        }

        return result;
    }
}
