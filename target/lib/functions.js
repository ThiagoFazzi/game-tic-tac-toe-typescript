"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = ['red', 'blue', 'green', 'yellow', 'magenta'];
exports.getColor = () => {
    const colorIndex = Math.floor(Math.random() * exports.colors.length);
    return exports.colors[colorIndex];
};
exports.colorValidate = (color) => exports.colors.filter((c) => c === color)
    .length;
exports.getBoard = () => [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']];
exports.movesValidate = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
//# sourceMappingURL=functions.js.map