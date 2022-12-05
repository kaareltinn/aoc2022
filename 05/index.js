import { inspect, transpose, reverse, head, compose, splitEvery, take, takeLast, repeat } from '../deps.ts'

const [cratesData, instructionsData] = Deno.readTextFileSync(Deno.args[0]).split('\n\n')

const parseCrates = data =>
  transpose(data.split('\n'))
    .map(reverse)
    .filter(x => +head(x))
    .reduce((acc, [colId, ...crates]) => ({
      ...acc,
      [colId]: reverse(crates.filter(x => x !== ' '))
    }), {})

const parseInstructions = data =>
  data
    .trim()
    .split('\n')
    .map(x => x.split(' '))
    .map(splitEvery(2))
    .map(xs => xs.reduce((acc, [k, v]) => ({
      ...acc, [k]: +v
    }), []))

const crates = parseCrates(cratesData)
const instructions = parseInstructions(instructionsData)

const moveCrate = (from, to) => crates => {
  const [crate, ...rest] = crates[from]

  return {
    ...crates,
    [from]: rest,
    [to]: [crate, ...crates[to]]
  }
}

const moveCrates = (from, to, count, crates) => {
  const createsToMove = take(count, crates[from])
  const rest = takeLast(crates[from].length - count, crates[from])

  return {
    ...crates,
    [from]: rest,
    [to]: [...createsToMove, ...crates[to]]
  }
}

// compose(
//   inspect,
//   moveCrate(1, 2),

//   moveCrate(2, 1),
//   moveCrate(2, 1),

//   moveCrate(1, 3),
//   moveCrate(1, 3),
//   moveCrate(1, 3),

//   moveCrate(2, 1),
// )(crates)

const finalPart1 = instructions.reduce((crates, {move: count, from, to}) =>
    compose(...repeat(moveCrate(from, to), count))(crates)
  , crates)

const finalPart2 = instructions.reduce((crates, {move: count, from, to}) =>
  moveCrates(from, to, count, crates)
  , crates)

console.log('Day 5, Part 1: ', Object.values(finalPart1).map(([h, ...rest]) => h).join(''))
console.log('Day 5, Part 2: ', Object.values(finalPart2).map(([h, ...rest]) => h).join(''))
