// @flow

export type Match<model, message> = (message, model) => model

type Matcher<model, message> = $ObjMap<
  message & message,
  <payload>(payload) => (payload, model) => model
>

export default <model, message: {}>(
  matcher: Matcher<model, message>
): Match<model, message> => (payload: message, state: model): model => {
  for (const key in payload) {
    if (key in matcher) {
      state = matcher[key](payload[key], state)
    } else {
      throw TypeError(
        `Unable to match property \`${key}\`, corresponding handler is undefined`
      )
    }
  }
  return state
}
