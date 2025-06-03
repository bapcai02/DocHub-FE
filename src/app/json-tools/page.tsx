'use client'

import MainLayout from '@/components/Home/MainLayout'
import { useState } from 'react'

const TOOLS = [
  { key: 'viewer', label: 'JSON Viewer/Formatter' },
  { key: 'to-array', label: 'JSON → Array' },
  { key: 'to-csv', label: 'JSON → CSV' },
  { key: 'minify', label: 'JSON Minify' },
  { key: 'beautify', label: 'JSON Beautify' },
  { key: 'diff', label: 'JSON Diff' },
  { key: 'to-xml', label: 'JSON → XML' },
  { key: 'to-yaml', label: 'JSON → YAML' },
  { key: 'array-to-json', label: 'Array/Object → JSON' },
]

function jsonToCsv(json: any): string {
  if (!Array.isArray(json)) return 'Chỉ hỗ trợ mảng object!'
  if (json.length === 0) return ''
  const keys = Object.keys(json[0])
  const rows = [keys.join(',')]
  for (const obj of json) {
    rows.push(keys.map(k => JSON.stringify(obj[k] ?? '')).join(','))
  }
  return rows.join('\n')
}

function jsonToXml(obj: any, indent = ''): string {
  if (Array.isArray(obj)) {
    return obj.map(item => jsonToXml(item, indent)).join('\n')
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj)
      .map(([k, v]) => `${indent}<${k}>${jsonToXml(v, indent + '  ')}</${k}>`)
      .join('\n')
  } else {
    return String(obj)
  }
}

function jsonToYaml(obj: any, indent = ''): string {
  if (Array.isArray(obj)) {
    return obj.map(item => `${indent}- ${jsonToYaml(item, indent + '  ')}`).join('\n')
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj)
      .map(([k, v]) => `${indent}${k}: ${typeof v === 'object' ? '\n' + jsonToYaml(v, indent + '  ') : jsonToYaml(v, '')}`)
      .join('\n')
  } else {
    return String(obj)
  }
}

function getJsonInfo(json: any) {
  let type = typeof json
  let count = 0
  let depth = 1
  if (Array.isArray(json)) {
    type = 'array'
    count = json.length
  } else if (type === 'object' && json !== null) {
    count = Object.keys(json).length
  }
  function getDepth(obj: any, d = 1): number {
    if (typeof obj !== 'object' || obj === null) return d
    if (Array.isArray(obj)) {
      return obj.length === 0 ? d : Math.max(...obj.map(i => getDepth(i, d + 1)))
    }
    const values = Object.values(obj)
    return values.length === 0 ? d : Math.max(...values.map(v => getDepth(v, d + 1)))
  }
  depth = getDepth(json)
  return { type, count, depth }
}

export default function JsonToolsPage() {
  const [active, setActive] = useState('viewer')

  // Shared states
  const [input, setInput] = useState('')
  const [input2, setInput2] = useState('') // for diff
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  // Array/Object to JSON
  const [arrayInput, setArrayInput] = useState('')
  const [arrayJson, setArrayJson] = useState('')
  const [arrayError, setArrayError] = useState('')

  // Tool handlers
  const handleTool = () => {
    setError('')
    setOutput('')
    try {
      if (active === 'viewer' || active === 'beautify') {
        const obj = JSON.parse(input)
        setOutput(JSON.stringify(obj, null, 2))
      } else if (active === 'minify') {
        const obj = JSON.parse(input)
        setOutput(JSON.stringify(obj))
      } else if (active === 'to-array') {
        const obj = JSON.parse(input)
        if (Array.isArray(obj)) {
          setOutput(JSON.stringify(obj, null, 2))
        } else if (typeof obj === 'object') {
          setOutput(JSON.stringify(Object.entries(obj), null, 2))
        } else {
          setOutput('Không thể chuyển đổi thành array!')
        }
      } else if (active === 'to-csv') {
        const obj = JSON.parse(input)
        setOutput(jsonToCsv(obj))
      } else if (active === 'diff') {
        const obj1 = JSON.parse(input)
        const obj2 = JSON.parse(input2)
        setOutput(obj1 && obj2 ? diffJson(obj1, obj2) : 'Không hợp lệ')
      } else if (active === 'to-xml') {
        const obj = JSON.parse(input)
        setOutput(jsonToXml(obj))
      } else if (active === 'to-yaml') {
        const obj = JSON.parse(input)
        setOutput(jsonToYaml(obj))
      }
    } catch (e: any) {
      setError('JSON không hợp lệ!')
      setOutput('')
    }
  }

  // Array/Object to JSON
  const handleArrayToJson = () => {
    setArrayError('')
    setArrayJson('')
    try {
      // eslint-disable-next-line no-eval
      const arr = eval('(' + arrayInput + ')')
      setArrayJson(JSON.stringify(arr, null, 2))
    } catch {
      setArrayError('Array/Object không hợp lệ!')
    }
  }

  // JSON Diff (simple)
  function diffJson(a: any, b: any): string {
    if (JSON.stringify(a) === JSON.stringify(b)) return 'Hai JSON giống nhau.'
    return `JSON 1:\n${JSON.stringify(a, null, 2)}\n\nJSON 2:\n${JSON.stringify(b, null, 2)}`
  }

  return (
    <MainLayout>
        <div className="w-full bg-[#23272f] text-white flex">
        {/* Sidebar menu */}
        <aside className="w-64 bg-gray-900 border-r border-neutral-800 flex flex-col py-8 px-4 gap-2">
            <h2 className="text-xl font-bold mb-6">🧩 JSON Tools</h2>
            {TOOLS.map(tool => (
            <button
                key={tool.key}
                className={`text-left px-3 py-2 rounded font-semibold transition-colors duration-150 ${
                active === tool.key ? 'bg-blue-600 text-white' : 'hover:bg-neutral-800 text-gray-200'
                }`}
                onClick={() => {
                setActive(tool.key)
                setInput('')
                setInput2('')
                setOutput('')
                setError('')
                setArrayInput('')
                setArrayJson('')
                setArrayError('')
                }}
            >
                {tool.label}
            </button>
            ))}
        </aside>
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center py-10 px-2">
            <div className="bg-neutral-900 rounded-xl p-8 flex flex-col gap-6 w-full max-w-5xl mx-auto h-full shadow-lg">
            {/* Tool content */}
            {active === 'viewer' && (
                <div className="flex flex-col md:flex-row gap-8 h-[90%]">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Dán hoặc nhập JSON:</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='{
    "name": "GitHub Copilot",
    "type": "AI"
    }'
                    value={input}
                    onChange={e => {
                        setInput(e.target.value)
                        setError('')
                        setOutput('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                    <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold w-fit"
                    onClick={handleTool}
                    >
                    Format
                    </button>
                    {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Kết quả:</label>
                    <pre className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-green-300 p-3 font-mono text-base overflow-auto"
                    style={{ height: '100%', minHeight: 0 }}
                    >
                    {output}
                    </pre>
                </div>
                </div>
            )}
            {active === 'to-array' && (
                <div className="flex flex-col md:flex-row gap-8 h-[90%]">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Nhập JSON:</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='{"a":1,"b":2}'
                    value={input}
                    onChange={e => {
                        setInput(e.target.value)
                        setError('')
                        setOutput('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                    <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold w-fit"
                    onClick={handleTool}
                    >
                    Convert to Array
                    </button>
                    {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Array (JS):</label>
                    <pre className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-yellow-300 p-3 font-mono text-base overflow-auto"
                    style={{ height: '100%', minHeight: 0 }}
                    >
                    {output}
                    </pre>
                </div>
                </div>
            )}
            {active === 'to-csv' && (
                <div className="flex flex-col md:flex-row gap-8 h-[90%]">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Nhập JSON (array of object):</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='[{"a":1,"b":2},{"a":3,"b":4}]'
                    value={input}
                    onChange={e => {
                        setInput(e.target.value)
                        setError('')
                        setOutput('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                    <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold w-fit"
                    onClick={handleTool}
                    >
                    Convert to CSV
                    </button>
                    {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">CSV:</label>
                    <pre className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-blue-300 p-3 font-mono text-base overflow-auto"
                    style={{ height: '100%', minHeight: 0 }}
                    >
                    {output}
                    </pre>
                </div>
                </div>
            )}
            {active === 'minify' && (
                <div className="flex flex-col md:flex-row gap-8 h-[90%]">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Nhập JSON:</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='{
    "a": 1,
    "b": 2
    }'
                    value={input}
                    onChange={e => {
                        setInput(e.target.value)
                        setError('')
                        setOutput('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                    <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold w-fit"
                    onClick={handleTool}
                    >
                    Minify
                    </button>
                    {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Minified JSON:</label>
                    <pre
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-pink-300 p-3 font-mono text-base overflow-auto whitespace-pre-wrap break-words"
                    style={{ height: '100%', minHeight: 0 }}
                    >
                    {output}
                    </pre>
                </div>
                </div>
            )}
            {active === 'beautify' && (
                <div className="flex flex-col md:flex-row gap-8 h-[90%]">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Nhập JSON:</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='{"a":1,"b":2}'
                    value={input}
                    onChange={e => {
                        setInput(e.target.value)
                        setError('')
                        setOutput('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                    <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold w-fit"
                    onClick={handleTool}
                    >
                    Beautify
                    </button>
                    {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Beautified JSON:</label>
                    <pre className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-green-300 p-3 font-mono text-base overflow-auto"
                    style={{ height: '100%', minHeight: 0 }}
                    >
                    {output}
                    </pre>
                </div>
                </div>
            )}
            {active === 'diff' && (
                <div className="flex flex-col md:flex-row gap-8 h-[90%]">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">JSON 1:</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='{"a":1,"b":2}'
                    value={input}
                    onChange={e => {
                        setInput(e.target.value)
                        setError('')
                        setOutput('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">JSON 2:</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='{"a":1,"b":3}'
                    value={input2}
                    onChange={e => {
                        setInput2(e.target.value)
                        setError('')
                        setOutput('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                </div>
                <div className="flex flex-col gap-2 justify-end">
                    <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold w-fit"
                    onClick={handleTool}
                    >
                    Diff
                    </button>
                    {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Diff Result:</label>
                    <pre className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-yellow-300 p-3 font-mono text-base overflow-auto"
                    style={{ height: '100%', minHeight: 0 }}
                    >
                    {output}
                    </pre>
                </div>
                </div>
            )}
            {active === 'to-xml' && (
                <div className="flex flex-col md:flex-row gap-8 h-[90%]">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Nhập JSON:</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='{"a":1,"b":2}'
                    value={input}
                    onChange={e => {
                        setInput(e.target.value)
                        setError('')
                        setOutput('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                    <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold w-fit"
                    onClick={handleTool}
                    >
                    Convert to XML
                    </button>
                    {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">XML:</label>
                    <pre className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-blue-300 p-3 font-mono text-base overflow-auto"
                    style={{ height: '100%', minHeight: 0 }}
                    >
                    {output}
                    </pre>
                </div>
                </div>
            )}
            {active === 'to-yaml' && (
                <div className="flex flex-col md:flex-row gap-8 h-[90%]">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Nhập JSON:</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='{"a":1,"b":2}'
                    value={input}
                    onChange={e => {
                        setInput(e.target.value)
                        setError('')
                        setOutput('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                    <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold w-fit"
                    onClick={handleTool}
                    >
                    Convert to YAML
                    </button>
                    {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">YAML:</label>
                    <pre className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-yellow-300 p-3 font-mono text-base overflow-auto"
                    style={{ height: '100%', minHeight: 0 }}
                    >
                    {output}
                    </pre>
                </div>
                </div>
            )}
            {active === 'array-to-json' && (
                <div className="flex flex-col md:flex-row gap-8 h-[90%]">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">Nhập Array/Object (JS/PHP/Python):</label>
                    <textarea
                    className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-white p-3 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder='[1,2,3] hoặc {"a":1,"b":2}'
                    value={arrayInput}
                    onChange={e => {
                        setArrayInput(e.target.value)
                        setArrayError('')
                        setArrayJson('')
                    }}
                    spellCheck={false}
                    style={{ height: '100%', minHeight: 0 }}
                    />
                    <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold w-fit"
                    onClick={handleArrayToJson}
                    >
                    Convert to JSON
                    </button>
                    {arrayError && <div className="text-red-400 font-semibold mt-2">{arrayError}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold mb-1">JSON:</label>
                    <pre className="w-full flex-1 min-h-0 h-full rounded bg-neutral-800 text-green-300 p-3 font-mono text-base overflow-auto"
                    style={{ height: '100%', minHeight: 0 }}
                    >
                    {arrayJson}
                    </pre>
                </div>
                </div>
            )}
            {(active === 'viewer' || active === 'beautify' || active === 'minify' || active === 'to-array') && output && (() => {
    try {
        const info = getJsonInfo(JSON.parse(input))
        return (
        <div className="mb-2 text-sm text-gray-300 flex flex-wrap gap-4">
            <span>Loại: <b>{info.type}</b></span>
            <span>
            {info.type === 'array'
                ? <>Số phần tử: <b>{info.count}</b></>
                : info.type === 'object'
                ? <>Số key: <b>{info.count}</b></>
                : null}
            </span>
            <span>Độ sâu lồng nhau: <b>{info.depth}</b></span>
            <span>Kích thước: <b>{input.length}</b> ký tự</span>
        </div>
        )
    } catch { return null }
    })()}
            </div>
        </main>
        </div>
    </MainLayout>
  )
}