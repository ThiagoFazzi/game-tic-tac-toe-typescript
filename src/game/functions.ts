export const colorArray = ['red','blue','green','yellow','magenta']

export const getColor = () => {
  const colorIndex = Math.floor(Math.random() * colorArray.length)
    return colorArray[colorIndex]
}

export const getBoard = ()  => 
    [['o', 'o', 'o'],['o', 'o', 'o'],['o', 'o', 'o']]


export const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length
