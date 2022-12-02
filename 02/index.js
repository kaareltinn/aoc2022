const data = Deno.readTextFileSync(Deno.args[0])
  .trim()
  .split('\n')
  .map(text => text.split(' '))

// A, X - Rock
// B, Y - Paper
// C, Z - Scissors
const scores = {
  A: 1,
  X: 1,
  B: 2,
  Y: 2,
  C: 3,
  Z: 3
}

// A X : 1 1 :  0 - draw
// A Y : 1 2 : -1 - win
// A Z : 1 3 : -2 - lost
// B X : 2 1 :  1 - lost
// B Y : 2 2 :  0 - draw
// B Z : 2 3 : -1 - win
// C X : 3 1 :  2 - win
// C Y : 3 2 :  1 - lost
// C Z : 3 3 :  0 - draw
const resultScores = {
  [0]: 3,
  [-1]: 6,
  [2]: 6,
  [1]: 0,
  [-2]: 0
}

// A X -> C : 1 3 : -2 - lost
// A Y -> A : 1 1 :  0 - draw
// A Z -> B : 1 2 : -1 - win
// B X -> A : 2 1 :  1 - lost
// B Y -> B : 2 2 :  0 - draw
// B Z -> C : 2 3 : -1 - lost
// C X -> B : 3 2 :  1 - lost
// C Y -> C : 3 3 :  0 - draw
// C Z -> A : 3 1 :  2 - win
const decideHand = {
  AX: 'C',
  AY: 'A',
  AZ: 'B',
  BX: 'A',
  BY: 'B',
  BZ: 'C',
  CX: 'B',
  CY: 'C',
  CZ: 'A'
}

const sum = (array) => array.reduce((acc, x) => acc + x, 0)

const scoreRound = (opponent, you) => resultScores[opponent - you] + you

const total1 = sum(data.map(([o, y]) => scoreRound(scores[o], scores[y])))
const total2 = sum(data.map(([o, r]) => scoreRound(scores[o], scores[decideHand[o + r]])))

console.log('Day 2, Part 1: ', total1)
console.log('Day 2, Part 2: ', total2)
