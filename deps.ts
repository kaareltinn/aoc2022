/**
 * deps.ts
 *
 * This module re-exports the required methods from the dependant remote Ramda module.
 */
export {
  add,
  intersection,
  multiply,
  transpose,
  reverse,
  head,
  tail,
  negate,
  isEmpty,
  zip,
  compose,
  splitEvery,
  repeat,
  map,
  take,
  takeLast
} from "https://x.nest.land/ramda@0.27.0/source/index.js";

const inspect = x => {
  console.log(x)
  return x
}

export {
  inspect
}
