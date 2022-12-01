const text = await Deno.readTextFile('./input.txt')

const data = text
  .split("\n\n")
  .map(e => e.trim().split("\n"))
  .map(array => array.map(s => parseInt(s, 10)))

const calculateCalories = (data) =>
  data
    .map((elfInventory) => elfInventory.reduce((partialSum, a) => partialSum + a, 0))


const calculateMax = (data) =>
  calculateCalories(data).reduce((prev, cur) => prev > cur ? prev : cur, 0)

const findTopThree = (data) =>
  calculateCalories(data).sort((a, b) => b - a)
    .reduce((partialSum, a, i) => i < 3 ? partialSum + a : partialSum, 0)

console.log(calculateMax(data))
console.log(findTopThree(data))
