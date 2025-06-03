'use client'

import { useState } from 'react'

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'php', label: 'PHP' },
  { value: 'java', label: 'Java' },
]

export default function CodeRunnerPage() {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRun = async () => {
    setLoading(true)
    setOutput('')
    try {
      const res = await fetch('/api/run-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code }),
      })
      if (!res.ok) {
        throw new Error('Không thể kết nối tới server hoặc server trả về lỗi.')
      }
      const data = await res.json()
      setOutput(data.output || data.error || 'No output')
    } catch (err: any) {
      setOutput('Lỗi: ' + (err.message || 'Không thể chạy code.'))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen w-full bg-[#23272f] text-white flex flex-col">
      <header className="px-8 py-6 border-b border-neutral-800 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🖥️ Online Code Runner</h1>
        <div className="flex gap-4 items-center">
          <label className="font-semibold">Ngôn ngữ:</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="bg-neutral-800 rounded px-3 py-2 text-white text-base"
          >
            {LANGUAGES.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
      </header>
      <main className="flex-1 flex flex-row w-full">
        {/* Code Editor */}
        <section className="flex-1 flex flex-col p-8 gap-4 bg-[#23272f] border-r border-neutral-800">
          <label className="font-semibold mb-2">Nhập code:</label>
          <textarea
            className="flex-1 w-full rounded bg-neutral-900 text-white p-4 font-mono text-base resize-none outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Nhập code ở đây..."
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            style={{ minHeight: 300 }}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 rounded px-6 py-2 font-semibold w-fit self-end"
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? 'Đang chạy...' : 'Chạy code'}
          </button>
        </section>
        {/* Output */}
        <section className="flex-1 flex flex-col p-8 gap-4 bg-neutral-900">
          <label className="font-semibold mb-2">Kết quả:</label>
          <pre className="flex-1 w-full rounded bg-neutral-800 text-green-400 p-4 text-base overflow-auto min-h-[300px]">
            {output}
          </pre>
        </section>
      </main>
    </div>
  )
}