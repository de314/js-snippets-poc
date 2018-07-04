import React from 'react'
import _ from 'lodash'
import data from './data'

import { compose, withHandlers, withState } from 'recompose'

import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/mode/json'
import 'brace/theme/monokai'
import 'brace/theme/github'

function toFunc(funcString) {
  return new Function(`return ${funcString.toString()}`)()
}

const ACE_EXECUTE_COMMAND = handler => ({
  name: 'execute',
  bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
  exec: handler,
})

const App = ({ func, setFunc, input, setInput, output, executeFunc }) => (
  <div className="App container">
    <div className="row">
      <div className="col-12">
        <h1>Script</h1>
        <AceEditor
          mode="javascript"
          theme="monokai"
          style={{ width: '100%' }}
          value={func}
          onChange={val => setFunc(val)}
          commands={[ACE_EXECUTE_COMMAND(executeFunc)]}
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-6">
        <h1>Input</h1>
        <div>
          <select
            className="form-control"
            onChange={e => setInput(e.target.value)}>
            {Object.keys(data.input).map(k => (
              <option value={data.input[k]} key={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
        <AceEditor
          mode="json"
          theme="github"
          value={input}
          onChange={val => setInput(val)}
          commands={[ACE_EXECUTE_COMMAND(executeFunc)]}
          editorProps={{ $blockScrolling: true }}
        />
        <div className="text-right">
          <button className="btn btn-primary" onClick={executeFunc}>
            <i className="fa fa-bolt" /> Run
          </button>
        </div>
      </div>
      <div className="col-6">
        <h1>Output</h1>
        <AceEditor
          mode="json"
          theme="github"
          value={output}
          readOnly
          highlightActiveLine={false}
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  </div>
)

const DEFAULT_FUNC = `/**
 * TODO: provide some awesome documentation
 */
function process(input, callback) {
  // v v v v your code here v v v v
  callback({
    greeting: \`Hello, \${input.name}!\`
  })
  // ^ ^ ^ ^ your code here ^ ^ ^ ^
}`

//function process(input, callback) {↵  ↵  callback({↵    greeting: `Hello, ${input.name}!`↵  })↵  // ^ ^ ^ ^ your code here ^ ^ ^ ^↵}"

const DEFAULT_INPUT = data.input.user

export default compose(
  withState('func', 'setFunc', DEFAULT_FUNC),
  withState('input', 'setInput', DEFAULT_INPUT),
  withState('output', 'setOutput', 'null'),
  withHandlers({
    executeFunc: ({ func, input, setOutput }) => () => {
      try {
        const cleanFunc = func
          .replace(/^[\s\S]*?function process/, 'function process')
          .replace(/\s*\/\/[\s\S]*?$/gm, '')
        console.log(JSON.stringify({ func, input }, null, 2))
        toFunc(cleanFunc)(JSON.parse(input), val =>
          setOutput(JSON.stringify(val, null, 2)),
        )
      } catch (e) {
        console.error(e)
      }
    },
  }),
)(App)
