import { inspect, intersection } from '../deps.ts'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
const range = ([start, stop]) =>
  Array.from({ length: (stop - start) / 1 + 1 }, (_, i) => start + i * 1)

const toInt = s => +s

const parseRange = xs =>
  xs
    .map(x => x.split('-').map(toInt))
    .map(range)

const data = Deno.readTextFileSync(Deno.args[0])
  .trim()
  .split('\n')
  .map(txt => txt.split(','))
  .map(parseRange)

const part1 = data
  .reduce((acc, [x, y]) => {
    const i = intersection(x, y)

    if (i.length === x.length || i.length === y.length) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)

const part2 = data
  .reduce((acc, [x, y]) => {
    const i = intersection(x, y)

    if (i.length > 0) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)

console.log('Day 4, Part 1: ', part1)
console.log('Day 4, Part 2: ', part2)
