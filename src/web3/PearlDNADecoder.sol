// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "../../PearlNFT/IPearl.sol";

library Constants {
    function pearlShapeTypes() internal pure returns (string[6] memory) {
        return ["round", "drop", "button", "oval", "ringed", "baroque"];
    }

    function pearlBodyColorTypes() internal pure returns (string[12] memory) {
        return [
            "white",
            "black",
            "blue-green",
            "aubergine",
            "blue",
            "pink",
            "gold",
            "green",
            "brown",
            "silver",
            "grey",
            "cream"
        ];
    }

    function overtoneColorTypes() internal pure returns (string[12] memory) {
        return [
            "rainbow",
            "peacock",
            "blue-green",
            "aubergine",
            "red",
            "blue",
            "pink",
            "green",
            "gold",
            "rose",
            "silver",
            "cream"
        ];
    }

    // vals represent percentage basis points chance of occurrence of corresponding types
    function pearlShapeVals() internal pure returns (uint16[6] memory) {
        return [500, 800, 1200, 1500, 2500, 3500];
    }

    function pearlBodyColorVals() internal pure returns (uint16[12] memory) {
        return [100, 100, 200, 300, 500, 800, 800, 1000, 1200, 1500, 1500, 2000];
    }

    function overtoneColorVals() internal pure returns (uint16[12] memory) {
        return [10, 90, 200, 300, 500, 700, 1000, 1000, 1200, 1500, 1500, 2000];
    }

    function bodyColorMin() internal pure returns (uint256[3][12] memory) {
        return [
            [uint256(0), 0, 80],
            [uint256(0), 0, 3],
            [uint256(150), 40, 50],
            [uint256(270), 75, 20],
            [uint256(205), 70, 60],
            [uint256(300), 30, 80],
            [uint256(35), 70, 70],
            [uint256(90), 60, 60],
            [uint256(0), 80, 15],
            [uint256(0), 0, 55],
            [uint256(0), 0, 30],
            [uint256(40), 25, 80]
        ];
    }

    function bodyColorMax() internal pure returns (uint256[3][12] memory) {
        return [
            [uint256(0), 0, 100],
            [uint256(0), 0, 10],
            [uint256(170), 100, 90],
            [uint256(290), 100, 40],
            [uint256(240), 100, 100],
            [uint256(320), 90, 90],
            [uint256(45), 100, 95],
            [uint256(130), 90, 90],
            [uint256(20), 100, 40],
            [uint256(0), 0, 65],
            [uint256(0), 0, 50],
            [uint256(55), 45, 100]
        ];
    }

    function overtoneMin() internal pure returns (uint256[3][12] memory) {
        return [
            [uint256(0), 0, 80],
            [uint256(0), 0, 80],
            [uint256(150), 40, 50],
            [uint256(270), 75, 20],
            [uint256(0), 80, 80],
            [uint256(205), 70, 60],
            [uint256(300), 30, 80],
            [uint256(90), 60, 60],
            [uint256(35), 70, 70],
            [uint256(335), 40, 80],
            [uint256(0), 0, 55],
            [uint256(40), 25, 80]
        ];
    }

    function overtoneMax() internal pure returns (uint256[3][12] memory) {
        return [
            [uint256(0), 0, 100],
            [uint256(0), 0, 100],
            [uint256(170), 100, 90],
            [uint256(290), 100, 40],
            [uint256(5), 100, 100],
            [uint256(240), 100, 100],
            [uint256(320), 90, 90],
            [uint256(130), 90, 90],
            [uint256(45), 100, 95],
            [uint256(345), 60, 100],
            [uint256(0), 0, 65],
            [uint256(55), 45, 100]
        ];
    }
}

/**
 * @title PearlDNADecoder
 * @dev It interprets the traits from a pearl dna
 */
contract PearlDNADecoder is Initializable {
    using SafeMathUpgradeable for uint256;

    struct Traits {
        string shape;
        string color;
        string overtone;
        uint256 size;
        uint256 lustre;
        uint256 nacreQuality;
        uint256 surface;
        bool glow;
        string rarity;
        uint256 rarityValue;
        uint256[3][2] HSV;
    }

    IPearl public pearl;

    mapping(uint256 => Traits) public dnaToTraits;

    // global
    uint256[3][2] private HSV;
    uint256[] private rngDigits;
    uint256 private rarityValue;
    // rarity is increased as clam reaches end of lifespan
    uint256 private rarityIncreaser;

    event PearlDnaDecoded(uint256 timestamp, uint256 rng);

    function initialize(IPearl _pearl) public virtual initializer {
        pearl = _pearl;
        rarityValue = 1e12;
    }

    /**
     * @dev convenience function to get all dna traits.
     */
    function getDNADecoded(uint256 _rng) external view returns (Traits memory) {
        return (dnaToTraits[_rng]);
    }

    /**
     * @dev Increase the chance of occurrence of a value
     * @param val The value that needs to be increased
     * @param increaser Used to increase the value
     * @return Increased value
     */
    function increaseRarityOfVal(uint256 val, uint256 increaser) private pure returns (uint256) {
        if (increaser == 0) return val;

        uint256 portion = val.mul(increaser).div(100);
        /// @dev rarityIncreaser is either 0, 5, 10, 15, or 20
        /// @dev val < 100 means either 10 or 90 (overtoneColorVals)
        if (val < 100 && increaser % 2 != 0) portion = portion.add(1); // float values get rounded down, add 1 to compensate
        return val.add(portion);
    }

    /**
     * @dev Get pearl shape based on the input number and the arrays of vals and types.
     * @param _num 0-9999
     * @return result The shape (string)
     */
    function getPearlShape(uint256 _num, uint8[6] memory pearlShapeNumber) private returns (string memory result) {
        // pearlShapeNumber corresponds to the 'old' pearlShapeTypes array in clam dna decoder:
        // ["default", "ringed", "button", "drop", "round", "oval"];
        // But the new pearlShapeTypes array definition in Constants in this contract is:
        // ["round", "drop", "button", "oval", "ringed", "baroque"]
        // The index changes 'old' to 'new' are: 0 -> 5, 1 -> 4, 2 -> 2, 3 -> 1, 4 -> 0, 5 -> 3
        // and in reverse ('new' to 'old'): 0 -> 4, 1 -> 3, 2 -> 2, 3 -> 5, 4 -> 1, 5 -> 0
        uint8[6] memory oldPearlShapeNumberIndices = [4, 3, 2, 5, 1, 0];

        uint256 position;
        for (uint256 j; j < Constants.pearlShapeVals().length; j++) {
            uint256 dropRate = increaseRarityOfVal(
                increaseRarityOfVal(uint256(Constants.pearlShapeVals()[j]), rarityIncreaser),
                pearlShapeNumber[oldPearlShapeNumberIndices[j]]
            );
            uint256 upper = dropRate.add(position).sub(1);

            if (_num >= position && _num <= upper) {
                // INCREASE RARITY
                rarityValue = (rarityValue.mul(uint256(Constants.pearlShapeVals()[j]))).div(10000);

                result = Constants.pearlShapeTypes()[j];
                break;
            }
            position = upper.add(1);
        }
        return result;
    }

    function getTypeFromVals(
        uint256 _num,
        string[12] memory _types,
        uint16[12] memory _vals,
        uint256[3][12] memory min,
        uint256[3][12] memory max,
        uint8[10] memory boostValues
    ) private returns (string memory result, uint256[3] memory _HSV) {
        // old pearlBodyColorTypes array in clam dna decoder:
        // ["default", "blue", "green", "gold", "white", "black", "aubergine", "pink", "default", "brown"]
        // new array here (above, in Constants):
        // ["white", "black", "blue-green", "aubergine", "blue", "pink", "gold", "green", "brown", "silver", "grey", "cream"]
        // new colors which can not be boosted as per the old array: blue-green, silver, grey, cream
        // transpose old to new: 0 -> x, 1 -> 4, 2 -> 7, 3 -> 6, 4 -> 0, 5 -> 1, 6 -> 3, 7 -> 5, 8 -> x, 9 -> 8
        // new to old transpose: 0 -> 4, 1 -> 5, 2 -> x, 3 -> 6, 4 -> 1, 5 -> 7, 6 -> 3, 7 -> 2, 8 -> 9, 9 -> x, 10 -> x, 11 -> x
        // deliberately picking "default" (0) boost value for indices 2, 9, 10, 11
        uint8[12] memory oldBodyColorIndices = [4, 5, 0, 6, 1, 7, 3, 2, 9, 0, 0, 0];
        uint256 position;
        for (uint256 j; j < _vals.length; j++) {
            uint256 dropRate = increaseRarityOfVal(
                increaseRarityOfVal(uint256(_vals[j]), rarityIncreaser),
                boostValues[oldBodyColorIndices[j]]
            );
            uint256 upper = dropRate.add(position).sub(1);

            if (_num >= position && _num <= upper) {
                // INCREASE RARITY
                rarityValue = rarityValue.mul(uint256(_vals[j])).div(10000);

                result = _types[j];

                _HSV = setHSV(min[j], max[j]);
                break;
            }
            position = upper.add(1);
        }
        return (result, _HSV);
    }

    /**
     * @notice The rarity as a string based on the rarityValue. The lower the rarityValue, the rarer the Pearl
     */
    function getRarityInString() public view returns (string memory) {
        string memory value;
        if (rarityValue < uint256(18e6)) {
            value = "Legendary";
        } else if (rarityValue < uint256(80e6)) {
            value = "Epic";
        } else if (rarityValue < uint256(250e6)) {
            value = "Ultra Rare";
        } else if (rarityValue < uint256(700e6)) {
            value = "Rare";
        } else if (rarityValue < uint256(1600e6)) {
            value = "Uncommon";
        } else {
            value = "Common";
        }
        return value;
    }

    function getGlowValue(uint256 _num) private pure returns (bool glowValue) {
        if (_num == 999) {
            glowValue = true;
        } else {
            glowValue = false;
        }
    }

    function random(uint256 seed, uint256 mod) private view returns (uint256) {
        bytes32 bHash = blockhash(block.number - 1);
        uint256 randomNumber = uint256(uint256(keccak256(abi.encodePacked(block.timestamp, bHash, seed))) % mod);

        return randomNumber;
    }

    function setHSV(uint256[3] memory min, uint256[3] memory max) private view returns (uint256[3] memory) {
        uint256 H = min[0] + (random(2, (max[0] - min[0] + 1)));
        uint256 S = min[1] + (random(3, (max[1] - min[1] + 1)));
        uint256 V = min[2] + (random(5, (max[2] - min[2] + 1)));
        return [H, S, V];
    }

    /**
     * @dev adds elements to rngDigits
     * Digits are added backwards
     */
    function generateDigits(uint256 _num) private {
        uint256 _number = _num;
        while (_number > 0) {
            uint8 digit = uint8(_number % 10);
            _number = _number / 10;
            rngDigits.push(digit);
        }
    }

    function getDigit(uint256 _num, uint256 _digit) private pure returns (uint256) {
        uint256 _number = (_num / 10**_digit) % 10;
        return _number;
    }

    /// @dev helper functions for decodeTraitsFromDNA

    /**
     * @dev rarityIncreaser is percentage added to the vals to increase the chance of a rarer trait.
     * rarityIncreaser is calculated based on the lifespan of the mother clam.
     * As fewer pearls remain to give birth to, the chance for a rarer Pearl increases.
     * @param _pearlId The pearl id
     */
    function setRarityIncreaser(uint256 _pearlId) private {
        (, , uint256 pearlsRemaining, , , ) = pearl.pearlData(_pearlId);
        if (pearlsRemaining == 4) rarityIncreaser = 5;
        if (pearlsRemaining == 3) rarityIncreaser = 10;
        if (pearlsRemaining == 2) rarityIncreaser = 15;
        if (pearlsRemaining == 1) rarityIncreaser = 20;
    }

    function getNumForMainTraits(uint256 rng, uint8[4] memory nums) private pure returns (uint256) {
        return
            getDigit(rng, nums[0]).add((getDigit(rng, nums[1])).mul(10)).add((getDigit(rng, nums[2])).mul(100)).add(
                (getDigit(rng, nums[3])).mul(1000)
            );
    }

    function setPearlShape(uint256 rng, uint8[6] memory pearlShapeNumber) private {
        uint256 num = getNumForMainTraits(rng, [0, 1, 2, 3]);
        dnaToTraits[rng].shape = getPearlShape(num, pearlShapeNumber);
    }

    function setColorAndOvertoneTraits(uint256 rng, uint8[10] memory pearlBodyColorNumber) private {
        // bodyColor
        uint256 num = getNumForMainTraits(rng, [4, 5, 6, 7]);
        (string memory bodyColor, uint256[3] memory hsvBodyColor) = getTypeFromVals(
            num,
            Constants.pearlBodyColorTypes(),
            Constants.pearlBodyColorVals(),
            Constants.bodyColorMin(),
            Constants.bodyColorMax(),
            pearlBodyColorNumber
        );
        dnaToTraits[rng].color = bodyColor;
        dnaToTraits[rng].HSV[0] = hsvBodyColor;

        // overtone
        num = getNumForMainTraits(rng, [8, 9, 10, 11]);
        (string memory overtone, uint256[3] memory hsvOvertone) = getTypeFromVals(
            num,
            Constants.overtoneColorTypes(),
            Constants.overtoneColorVals(),
            Constants.overtoneMin(),
            Constants.overtoneMax(),
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        );

        dnaToTraits[rng].overtone = overtone;
        dnaToTraits[rng].HSV[1] = hsvOvertone;
    }

    function setRemainingTraits(uint256 rng) private {
        dnaToTraits[rng].size = getDigit(rng, 12).add(getDigit(rng, 13).mul(10)).add(1);
        dnaToTraits[rng].lustre = getDigit(rng, 14).add(getDigit(rng, 15).mul(10)).add(1);
        dnaToTraits[rng].nacreQuality = getDigit(rng, 16).add(getDigit(rng, 17).mul(10)).add(1);
        dnaToTraits[rng].surface = getDigit(rng, 18).add(getDigit(rng, 19).mul(10)).add(1);

        // GLOW TRAITS
        uint256 num = getDigit(rng, 20).add(getDigit(rng, 21).mul(10)).add(getDigit(rng, 22).mul(100));

        dnaToTraits[rng].glow = getGlowValue(num);

        dnaToTraits[rng].rarity = getRarityInString();

        dnaToTraits[rng].rarityValue = rarityValue;
    }

    /**
     * @notice Calculate traits based on dna
     * @dev Decode traits and register this in mapping based on dna (rng)
     * @param rng the dna
     * @param pearlId Pearl id
     */
    function decodeTraitsFromDNA(
        uint256 rng,
        uint256 pearlId,
        uint8[10] memory pearlBodyColorNumber,
        uint8[6] memory pearlShapeNumber
    ) external {
        require(address(pearl) != address(0), "Pearl address not initialized");

        setRarityIncreaser(pearlId);

        // Pearl SHAPE TRAIT
        setPearlShape(rng, pearlShapeNumber);

        // Color traits
        setColorAndOvertoneTraits(rng, pearlBodyColorNumber);

        setRemainingTraits(rng);

        emit PearlDnaDecoded(block.timestamp, rng);

        // reset global values
        //delete rngDigits;
        delete HSV;
        delete rarityIncreaser;
        rarityValue = 1e12;
    }
}
