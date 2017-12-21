// @flow

import match from "../"
import test from "blue-tape"

test("test baisc", async test => {
  test.isEqual(typeof match, "function")
})

test("calculator", async test => {
  const calculator = match({
    inc(_, n: number): number {
      return n + 1
    },
    dec(_, n: number): number {
      return n - 1
    },
    plus(delta: number, n: number): number {
      return n + delta
    }
  })

  test.equal(calculator({ inc: true }, 5), 6)
  test.equal(calculator({ dec: true }, 5), 4)
  test.equal(calculator({ plus: 5 }, 4), 9)
  test.equal(calculator({ plus: 3, inc: true }, 3), 7)
  test.equal(calculator({}, 2), 2)
})
