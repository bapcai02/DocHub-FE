'use client'

import Filters from '@/components/Home/Filters'
import MainLayout from '@/components/Home/MainLayout'
import { Sidebar } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const defaultPoints = [
  { x: 0.5, y: 0 },     // top
  { x: 0, y: 1 },       // bottom left
  { x: 1, y: 1 },       // bottom right
]

const clipTypes = [
  { label: 'Polygon', value: 'polygon' },
  { label: 'Circle', value: 'circle' },
  { label: 'Ellipse', value: 'ellipse' },
  { label: 'Inset', value: 'inset' },
]

const presets = [
  { name: 'Triangle', points: [ {x:0.5,y:0}, {x:0,y:1}, {x:1,y:1} ] },
  { name: 'Pentagon', points: [ {x:0.5,y:0}, {x:0.1,y:0.38}, {x:0.2,y:1}, {x:0.8,y:1}, {x:0.9,y:0.38} ] },
  { name: 'Hexagon', points: [ {x:0.25,y:0}, {x:0.75,y:0}, {x:1,y:0.5}, {x:0.75,y:1}, {x:0.25,y:1}, {x:0,y:0.5} ] },
  { name: 'Octagon', points: [ {x:0.3,y:0}, {x:0.7,y:0}, {x:1,y:0.3}, {x:1,y:0.7}, {x:0.7,y:1}, {x:0.3,y:1}, {x:0,y:0.7}, {x:0,y:0.3} ] },
]

const demoImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80'
]

const shapeExamples = [
  { name: 'Triangle', type: 'polygon', points: [ {x:0.5,y:0}, {x:0,y:1}, {x:1,y:1} ], color: '#fa7268' },
  { name: 'Trapezoid', type: 'polygon', points: [ {x:0.2,y:0}, {x:0.8,y:0}, {x:1,y:1}, {x:0,y:1} ], color: '#6ecb63' },
  { name: 'Parallelogram', type: 'polygon', points: [ {x:0.25,y:0}, {x:1,y:0}, {x:0.75,y:1}, {x:0,y:1} ], color: '#ffb347' },
  { name: 'Rhombus', type: 'polygon', points: [ {x:0.5,y:0}, {x:1,y:0.5}, {x:0.5,y:1}, {x:0,y:0.5} ], color: '#3fa7ff' },
  { name: 'Pentagon', type: 'polygon', points: [ {x:0.5,y:0}, {x:0.1,y:0.38}, {x:0.2,y:1}, {x:0.8,y:1}, {x:0.9,y:0.38} ], color: '#b47cff' },
  { name: 'Hexagon', type: 'polygon', points: [ {x:0.25,y:0}, {x:0.75,y:0}, {x:1,y:0.5}, {x:0.75,y:1}, {x:0.25,y:1}, {x:0,y:0.5} ], color: '#6ecbcb' },
  { name: 'Heptagon', type: 'polygon', points: [ {x:0.5,y:0}, {x:0.9,y:0.2}, {x:1,y:0.6}, {x:0.8,y:1}, {x:0.2,y:1}, {x:0,y:0.6}, {x:0.1,y:0.2} ], color: '#00bcd4' },
  { name: 'Octagon', type: 'polygon', points: [ {x:0.3,y:0}, {x:0.7,y:0}, {x:1,y:0.3}, {x:1,y:0.7}, {x:0.7,y:1}, {x:0.3,y:1}, {x:0,y:0.7}, {x:0,y:0.3} ], color: '#ffb347' },
  { name: 'Nonagon', type: 'polygon', points: [ {x:0.5,y:0}, {x:0.85,y:0.15}, {x:1,y:0.5}, {x:0.93,y:0.85}, {x:0.65,y:1}, {x:0.35,y:1}, {x:0.07,y:0.85}, {x:0,y:0.5}, {x:0.15,y:0.15} ], color: '#f7e967' },
  { name: 'Decagon', type: 'polygon', points: [ {x:0.5,y:0}, {x:0.81,y:0.09}, {x:1,y:0.38}, {x:0.95,y:0.71}, {x:0.69,y:0.95}, {x:0.31,y:0.95}, {x:0.05,y:0.71}, {x:0,y:0.38}, {x:0.19,y:0.09}, {x:0.5,y:0.2} ], color: '#4caf50' },
  { name: 'Bevel', type: 'polygon', points: [ {x:0.2,y:0}, {x:0.8,y:0}, {x:1,y:0.2}, {x:1,y:0.8}, {x:0.8,y:1}, {x:0.2,y:1}, {x:0,y:0.8}, {x:0,y:0.2} ], color: '#ff8a65' },
  { name: 'Rabbet', type: 'polygon', points: [ {x:0.2,y:0}, {x:0.8,y:0}, {x:0.8,y:0.2}, {x:1,y:0.2}, {x:1,y:0.8}, {x:0.8,y:0.8}, {x:0.8,y:1}, {x:0.2,y:1}, {x:0.2,y:0.8}, {x:0,y:0.8}, {x:0,y:0.2}, {x:0.2,y:0.2} ], color: '#3d348b' },
  { name: 'Left arrow', type: 'polygon', points: [ {x:1,y:0}, {x:0.3,y:0}, {x:0.3,y:0.25}, {x:0,y:0.5}, {x:0.3,y:0.75}, {x:0.3,y:1}, {x:1,y:1}, {x:1,y:0.75}, {x:0.6,y:0.5}, {x:1,y:0.25} ], color: '#fa7268' },
  { name: 'Right arrow', type: 'polygon', points: [ {x:0,y:0}, {x:0.7,y:0}, {x:0.7,y:0.25}, {x:1,y:0.5}, {x:0.7,y:0.75}, {x:0.7,y:1}, {x:0,y:1}, {x:0,y:0.75}, {x:0.4,y:0.5}, {x:0,y:0.25} ], color: '#b0bec5' },
  { name: 'Left Point', type: 'polygon', points: [ {x:1,y:0}, {x:0.5,y:0.5}, {x:1,y:1}, {x:0,y:0.5} ], color: '#e1bee7' },
  { name: 'Right Point', type: 'polygon', points: [ {x:0,y:0}, {x:0.5,y:0.5}, {x:0,y:1}, {x:1,y:0.5} ], color: '#8bc34a' },
  { name: 'Left Chevron', type: 'polygon', points: [ {x:1,y:0}, {x:0.4,y:0.5}, {x:1,y:1}, {x:0.6,y:1}, {x:0,y:0.5}, {x:0.6,y:0} ], color: '#8bc34a' },
  { name: 'Right Chevron', type: 'polygon', points: [ {x:0,y:0}, {x:0.6,y:0.5}, {x:0,y:1}, {x:0.4,y:1}, {x:1,y:0.5}, {x:0.4,y:0} ], color: '#ff8a65' },
  { name: 'Star', type: 'polygon', points: [ {x:0.5,y:0}, {x:0.61,y:0.35}, {x:1,y:0.38}, {x:0.68,y:0.59}, {x:0.81,y:1}, {x:0.5,y:0.75}, {x:0.19,y:1}, {x:0.32,y:0.59}, {x:0,y:0.38}, {x:0.39,y:0.35} ], color: '#ffd600' },
  { name: 'Cross', type: 'polygon', points: [ {x:0.35,y:0}, {x:0.65,y:0}, {x:0.65,y:0.35}, {x:1,y:0.35}, {x:1,y:0.65}, {x:0.65,y:0.65}, {x:0.65,y:1}, {x:0.35,y:1}, {x:0.35,y:0.65}, {x:0,y:0.65}, {x:0,y:0.35}, {x:0.35,y:0.35} ], color: '#ff7043' },
  { name: 'Message', type: 'polygon', points: [ {x:0.1,y:0.1}, {x:0.9,y:0.1}, {x:0.9,y:0.7}, {x:0.5,y:0.7}, {x:0.3,y:0.9}, {x:0.3,y:0.7}, {x:0.1,y:0.7} ], color: '#2196f3' },
  { name: 'Close', type: 'polygon', points: [ {x:0.2,y:0}, {x:0.5,y:0.3}, {x:0.8,y:0}, {x:1,y:0.2}, {x:0.7,y:0.5}, {x:1,y:0.8}, {x:0.8,y:1}, {x:0.5,y:0.7}, {x:0.2,y:1}, {x:0,y:0.8}, {x:0.3,y:0.5}, {x:0,y:0.2} ], color: '#ff9800' },
  { name: 'Frame', type: 'polygon', points: [ {x:0.2,y:0.2}, {x:0.8,y:0.2}, {x:0.8,y:0.8}, {x:0.2,y:0.8} ], color: '#00bcd4' },
  { name: 'Inset', type: 'inset', inset: { top: 10, right: 10, bottom: 10, left: 10, round: 0 }, color: '#b47cff' },
  { name: 'Custom Polygon', type: 'polygon', points: [ {x:0.1,y:0.9}, {x:0.5,y:0.1}, {x:0.9,y:0.9}, {x:0.1,y:0.6}, {x:0.9,y:0.6} ], color: '#fa7268' },
  { name: 'Circle', type: 'circle', circle: { x: 0.5, y: 0.5, r: 0.5 }, color: '#ffcb6e' },
  { name: 'Ellipse', type: 'ellipse', ellipse: { x: 0.5, y: 0.5, rx: 0.5, ry: 0.3 }, color: '#6ecb63' },
];

export default function ClipPathEditorPage() {
  const [clipType, setClipType] = useState('polygon')
  const [points, setPoints] = useState(defaultPoints)
  const [circle, setCircle] = useState({ x: 0.5, y: 0.5, r: 0.5 })
  const [ellipse, setEllipse] = useState({ x: 0.5, y: 0.5, rx: 0.5, ry: 0.3 })
  const [inset, setInset] = useState({ top: 10, right: 10, bottom: 10, left: 10, round: 0 })
  const [custom, setCustom] = useState('')
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1558980394-0c5c6aefb77c')
  const [dragIndex, setDragIndex] = useState(null)
  const [demoSize, setDemoSize] = useState({ w: 280, h: 280 })
  const containerRef = useRef(null)

  // Mouse move logic for polygon
  const handleMouseMove = (e: any) => {
    if (dragIndex === null || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const newPoints = [...points]
    newPoints[dragIndex] = {
      x: Math.min(1, Math.max(0, x)),
      y: Math.min(1, Math.max(0, y)),
    }
    setPoints(newPoints)
  }

  const handleMouseUp = () => setDragIndex(null)

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  })

  // Generate clip-path string
  let clipPath = ''
  if (clipType === 'polygon') {
    clipPath = `polygon(${points.map(p => `${(p.x * 100).toFixed(1)}% ${(p.y * 100).toFixed(1)}%`).join(', ')})`
  } else if (clipType === 'circle') {
    clipPath = `circle(${(circle.r * 50).toFixed(1)}% at ${(circle.x * 100).toFixed(1)}% ${(circle.y * 100).toFixed(1)}%)`
  } else if (clipType === 'ellipse') {
    clipPath = `ellipse(${(ellipse.rx * 50).toFixed(1)}% ${(ellipse.ry * 50).toFixed(1)}% at ${(ellipse.x * 100).toFixed(1)}% ${(ellipse.y * 100).toFixed(1)}%)`
  } else if (clipType === 'inset') {
    clipPath = `inset(${inset.top}% ${inset.right}% ${inset.bottom}% ${inset.left}% round ${inset.round}%)`
  } else if (clipType === 'custom') {
    clipPath = custom
  }

  // UI
  return (
    <MainLayout>
        <Sidebar />
        <section className="flex-1 flex flex-col overflow-hidden text-white">
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Main center */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div
                ref={containerRef}
                className="relative border bg-[#23272f] text-white w-full max-w-[400px] h-[300px] sm:h-[400px] mx-auto"
                style={{
                  width: demoSize.w,
                  height: demoSize.h,
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  clipPath,
                  margin: 32
                }}
              >
                {clipType === 'polygon' && points.map((point, index) => (
                <div
                    key={index}
                    className="absolute w-5 h-5 rounded-full border-2"
                    style={{
                    background: ['#fa7268', '#6ecb63', '#ffb347', '#6ecbcb', '#b47cff', '#ff6ecb', '#cbff6e', '#ffcb6e'][index % 8],
                    left: `calc(${point.x * 100}% - 10px)`,
                    top: `calc(${point.y * 100}% - 10px)`,
                    borderColor: '#fff',
                    cursor: 'pointer'
                    }}
                    onMouseDown={() => setDragIndex(index)}
                    title={`Point ${index + 1}`}
                />
                ))}
              </div>
              <pre className="mt-4 p-3 bg-neutral-900 text-white text-sm rounded font-mono w-full max-w-[90%] text-wrap">
                <span className="text-gray-400">clip-path:</span> <span className="text-[#fa7268]">{clipPath};</span>
              </pre>
            </div>
            {/* Sidebar */}
            <div className="w-full max-w-full h-full lg:max-w-[440px] border-t lg:border-t-0 lg:border-l p-4 flex flex-col gap-4 bg-[#23272f] text-white overflow-y-auto">
              {/* Preset shapes */}
              <div>
                <div className="font-semibold mb-2">Presets</div>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {presets.map(preset => (
                    <button
                      key={preset.name}
                      className="bg-gray-100 text-black hover:bg-blue-100 rounded p-2 text-xs"
                      onClick={() => { setClipType('polygon'); setPoints(preset.points) }}
                    >{preset.name}</button>
                  ))}
                </div>
              </div>
              {/* Examples shapes */}
              <div>
                <div className="font-semibold mb-2">Examples</div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {shapeExamples.map((ex, idx) => (
                    <button
                      key={ex.name}
                      className="flex flex-col items-center justify-center bg-[#23272f] hover:bg-neutral-800 rounded p-2 border border-neutral-700"
                      onClick={() => {
                        setClipType(ex.type);
                        if (ex.type === 'polygon') setPoints(ex.points);
                        if (ex.type === 'circle') setCircle(ex.circle);
                        if (ex.type === 'ellipse') setEllipse(ex.ellipse);
                        if (ex.type === 'inset') setInset(ex.inset);
                      }}
                      title={ex.name}
                    >
                      {/* Shape preview (simple SVG or div) */}
                      <div className="w-8 h-8 flex items-center justify-center mb-1">
                        {ex.type === 'polygon' && (
                          <svg viewBox="0 0 100 100" width={32} height={32}>
                            <polygon
                              points={ex.points.map(p => `${p.x*100},${p.y*100}`).join(' ')}
                              fill={ex.color}
                              stroke="#fff"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                        {ex.type === 'circle' && (
                          <svg viewBox="0 0 100 100" width={32} height={32}>
                            <circle cx={ex.circle.x*100} cy={ex.circle.y*100} r={ex.circle.r*50} fill={ex.color} stroke="#fff" strokeWidth="2"/>
                          </svg>
                        )}
                        {ex.type === 'ellipse' && (
                          <svg viewBox="0 0 100 100" width={32} height={32}>
                            <ellipse cx={ex.ellipse.x*100} cy={ex.ellipse.y*100} rx={ex.ellipse.rx*50} ry={ex.ellipse.ry*50} fill={ex.color} stroke="#fff" strokeWidth="2"/>
                          </svg>
                        )}
                        {ex.type === 'inset' && (
                          <svg viewBox="0 0 100 100" width={32} height={32}>
                            <rect x={ex.inset.left} y={ex.inset.top} width={100-ex.inset.left-ex.inset.right} height={100-ex.inset.top-ex.inset.bottom} fill={ex.color} stroke="#fff" strokeWidth="2"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-xs">{ex.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Demo size */}
              <div>
                <div className="font-semibold mb-2">Demo Size</div>
                <input type="number" value={demoSize.w} min={100} max={600}
                onChange={e => setDemoSize({ ...demoSize, w: parseInt(e.target.value) || 100 })}
                className="w-16 border rounded px-1 text-xs mr-2" /> x
                <input type="number" value={demoSize.h} min={100} max={600}
                onChange={e => setDemoSize({ ...demoSize, h: parseInt(e.target.value) || 100 })}
                className="w-16 border rounded px-1 text-xs ml-2" />
              </div>
              {/* Demo background */}
              <div>
                <div className="font-semibold mb-2">Demo Background</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {demoImages.map(url => (
                    <img
                      key={url}
                      src={url}
                      alt=""
                      className={`w-14 h-10 object-cover rounded border cursor-pointer ${imageUrl === url ? 'border-blue-500' : 'border-gray-200'}`}
                      onClick={() => setImageUrl(url)}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Custom URL..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full border rounded px-2 py-1 text-xs"
                />
              </div>
              {/* Controls */}
              <div>
                <div className="font-semibold mb-2">Clip Type</div>
                <div className="flex gap-2 mb-2">
                  {clipTypes.map(type => (
                    <button
                      key={type.value}
                      className={`px-3 py-1 rounded ${clipType === type.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                      onClick={() => setClipType(type.value)}
                    >
                      {type.label}
                    </button>
                  ))}
                  <button
                    className={`px-3 py-1 rounded ${clipType === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setClipType('custom')}
                  >
                    Custom
                  </button>
                </div>

                {/* Controls for each clip type */}
                {clipType === 'polygon' && (
                  <div className="mb-2 flex flex-wrap gap-2 items-center">
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => setPoints([...points, { x: 0.5, y: 0.5 }])}
                    >Add Point</button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      disabled={points.length <= 3}
                      onClick={() => setPoints(points.slice(0, -1))}
                    >Remove Point</button>
                    {points.map((p, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className="text-xs">#{i + 1}</span>
                        <input
                          type="number"
                          min={0}
                          max={1}
                          step={0.01}
                          value={p.x}
                          onChange={e => {
                            const newPoints = [...points]
                            newPoints[i].x = parseFloat(e.target.value)
                            setPoints(newPoints)
                          }}
                          className="w-14 border rounded px-1 text-xs"
                        />
                        <input
                          type="number"
                          min={0}
                          max={1}
                          step={0.01}
                          value={p.y}
                          onChange={e => {
                            const newPoints = [...points]
                            newPoints[i].y = parseFloat(e.target.value)
                            setPoints(newPoints)
                          }}
                          className="w-14 border rounded px-1 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {clipType === 'circle' && (
                  <div className="mb-2 flex gap-2 items-center">
                    <span>Center X:</span>
                    <input type="number" min={0} max={1} step={0.01} value={circle.x}
                    onChange={e => setCircle({ ...circle, x: parseFloat(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                    <span>Y:</span>
                    <input type="number" min={0} max={1} step={0.01} value={circle.y}
                    onChange={e => setCircle({ ...circle, y: parseFloat(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                    <span>Radius:</span>
                    <input type="number" min={0} max={1} step={0.01} value={circle.r}
                    onChange={e => setCircle({ ...circle, r: parseFloat(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                  </div>
                )}

                {clipType === 'ellipse' && (
                  <div className="mb-2 flex gap-2 items-center">
                    <span>Center X:</span>
                    <input type="number" min={0} max={1} step={0.01} value={ellipse.x}
                    onChange={e => setEllipse({ ...ellipse, x: parseFloat(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                    <span>Y:</span>
                    <input type="number" min={0} max={1} step={0.01} value={ellipse.y}
                    onChange={e => setEllipse({ ...ellipse, y: parseFloat(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                    <span>Radius X:</span>
                    <input type="number" min={0} max={1} step={0.01} value={ellipse.rx}
                    onChange={e => setEllipse({ ...ellipse, rx: parseFloat(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                    <span>Radius Y:</span>
                    <input type="number" min={0} max={1} step={0.01} value={ellipse.ry}
                    onChange={e => setEllipse({ ...ellipse, ry: parseFloat(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                  </div>
                )}

                {clipType === 'inset' && (
                  <div className="mb-2 flex gap-2 items-center">
                    <span>Top:</span>
                    <input type="number" min={0} max={100} value={inset.top}
                    onChange={e => setInset({ ...inset, top: parseInt(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                    <span>Right:</span>
                    <input type="number" min={0} max={100} value={inset.right}
                    onChange={e => setInset({ ...inset, right: parseInt(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                    <span>Bottom:</span>
                    <input type="number" min={0} max={100} value={inset.bottom}
                    onChange={e => setInset({ ...inset, bottom: parseInt(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                    <span>Left:</span>
                    <input type="number" min={0} max={100} value={inset.left}
                    onChange={e => setInset({ ...inset, left: parseInt(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                    <span>Round:</span>
                    <input type="number" min={0} max={100} value={inset.round}
                    onChange={e => setInset({ ...inset, round: parseInt(e.target.value) })} className="w-14 border rounded px-1 text-xs" />
                  </div>
                )}

                {clipType === 'custom' && (
                  <div className="mb-2">
                    <input
                      type="text"
                      value={custom}
                      onChange={e => setCustom(e.target.value)}
                      placeholder="clip-path: ..."
                      className="w-full border rounded px-2 py-1 text-xs"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
    </MainLayout>
  )
}