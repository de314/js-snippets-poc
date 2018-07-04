exports.delegateTest = (req, res) => {
  try {
    const { func, input } = req.body
    if (!func || !input) {
      // This is an error case, as "message" is required.
      res
        .status(400)
        .send('Missing required parameters [func: string, input: string]')
      return
    }
    const cleanFunc = func
      .replace(/^[\s\S]*?function process/, 'function process')
      .replace(/\s*\/\/[\s\S]*?$/gm, '')
    const parsedFunc = new Function(`return ${cleanFunc}`)()
    const parsedInput = JSON.parse(input)
    const cb = val => res.status(200).send(val)
    parsedFunc(parsedInput, cb)
  } catch (e) {
    console.error('failed to delegate', e)
    res.status(500).send(e)
  }
}
