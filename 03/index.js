import { add, intersection, splitEvery } from '../deps.ts'

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const inspect = x => {
  console.log(x)
  return x
}

const data = Deno.readTextFileSync(Deno.args[0])
  .trim()
  .split('\n')

const part1 = data
  .map(text => [text.slice(0, text.length / 2), text.slice(text.length / 2)])
  .flatMap(([x, y]) => intersection(x, y))
  .map(letter => LETTERS.indexOf(letter) + 1)
  .reduce(add, 0)

const part2 = splitEvery(3, data)
  .flatMap(([x, y, z]) => intersection(intersection(x, y), z))
  .map(letter => LETTERS.indexOf(letter) + 1)
  .reduce(add, 0)

console.log('Day 3, Part 1: ', part1)
console.log('Day 3, Part 2: ', part2)
