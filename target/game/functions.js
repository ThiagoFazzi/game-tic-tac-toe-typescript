"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorArray = ['red', 'blue', 'green', 'yellow', 'magenta'];
exports.getColor = () => {
    const colorIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[colorIndex];
};
exports.getBoard = () => {
    return [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']];
};
exports.moves = (board1, board2) => {
    board1
        .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
        .reduce((a, b) => a.concat(b))
        .length;
};
//# sourceMappingURL=functions.js.map