import * as R from '../deps.ts'

const text = Deno.readTextFileSync(Deno.args[0]).trim()

let result
let window = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
while (!result) {
  const sequence = window.map(i => text[i])
  console.log(sequence.join(''), R.uniq(sequence).length, result)

  if (R.uniq(sequence).length === 14) {
    result = window[13] + 1
    break
  } else {
    window = window.map(x => x + 1)
  }
}

console.log(result)
