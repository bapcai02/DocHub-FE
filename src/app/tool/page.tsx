'use client'

import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import { useRef, useState } from 'react'
import * as exifr from 'exifr'
import Image from 'next/image'
import MainLayout from '@/components/Home/MainLayout'

type ToolType =
  | 'convert-image'
  | 'convert-file'
  | 'resize-image'
  | 'compress-image'
  | 'crop-image'
  | 'image-to-base64'
  | 'svg-optimizer'
  | 'metadata-viewer'
  | 'batch-convert'
  | 'watermark'
  | 'color-palette'
  | 'qr-generator'
  | 'favicon-generator'

const TOOL_LABELS: Record<ToolType, string> = {
  'convert-image': 'Convert Image',
  'convert-file': 'Convert File (PDF/Excel)',
  'resize-image': 'Resize Image',
  'compress-image': 'Image Compressor',
  'crop-image': 'Image Cropper',
  'image-to-base64': 'Image to Base64',
  'svg-optimizer': 'SVG Optimizer',
  'metadata-viewer': 'Image Metadata Viewer/Remover',
  'batch-convert': 'Batch Image Converter',
  'watermark': 'Watermark Tool',
  'color-palette': 'Color Palette Extractor',
  'qr-generator': 'QR Code Generator',
  'favicon-generator': 'Favicon Generator',
}

export default function ImageConverterPage() {
  const [activeTool, setActiveTool] = useState<ToolType>('convert-image')

  // Shared states (dùng cho các tool ảnh)
  const [src, setSrc] = useState<string | null>(null)
  const [output, setOutput] = useState<string | null>(null)
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png')
  const [quality, setQuality] = useState(0.92)
  const [resizeW, setResizeW] = useState<number>(0)
  const [resizeH, setResizeH] = useState<number>(0)
  const [resizePreview, setResizePreview] = useState<string | null>(null)
  const [watermarkText, setWatermarkText] = useState<string>('')
  const fileInput = useRef<HTMLInputElement>(null)

  // Reset ảnh khi đổi tool
  const handleChangeTool = (tool: ToolType) => {
    setActiveTool(tool)
    setSrc(null)
    setOutput(null)
    setResizePreview(null)
    setResizeW(0)
    setResizeH(0)
    setWatermarkText('')
  }

  // File upload
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      setSrc(ev.target?.result as string)
      setOutput(null)
      setResizePreview(null)
      setResizeW(0)
      setResizeH(0)
    }
    reader.readAsDataURL(file)
  }

  // Convert image format
  const handleConvert = () => {
    if (!src) return
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      const mime = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png'
      const dataUrl = canvas.toDataURL(mime, quality)
      setOutput(dataUrl)
    }
    img.src = src
  }

  // Convert to PDF
  const handleConvertPDF = () => {
    if (!src) return
    const pdf = new jsPDF()
    pdf.addImage(src, 'PNG', 10, 10, 180, 180)
    pdf.save('converted.pdf')
  }

  // Convert to Excel
  const handleConvertExcel = () => {
    if (!src) return
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([['Image below:'], ['']])
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'converted.xlsx')
  }

  // Resize logic
  const handleResizePreview = () => {
    if (!src || !resizeW || !resizeH) return
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = resizeW
      canvas.height = resizeH
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, resizeW, resizeH)
      setResizePreview(canvas.toDataURL())
    }
    img.src = src
  }

  const handleDownloadResize = () => {
    if (!resizePreview) return
    const link = document.createElement('a')
    link.href = resizePreview
    link.download = 'resized-image.png'
    link.click()
  }

  // Tool content renderers
  const renderTool = () => {
    switch (activeTool) {
      case 'convert-image':
        return (
          <>
            <div className="flex gap-4 items-center">
              <label>Format:</label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as any)}
                className="bg-neutral-800 rounded px-2 py-1"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
              </select>
              {format !== 'png' && (
                <>
                  <label>Quality:</label>
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.01}
                    value={quality}
                    onChange={e => setQuality(Number(e.target.value))}
                    className="w-24"
                  />
                  <span>{Math.round(quality * 100)}%</span>
                </>
              )}
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold mt-2"
              onClick={handleConvert}
              disabled={!src}
            >
              Convert
            </button>
            {output && (
              <div className="flex flex-col items-center gap-2 mt-4">
                <Image
                  src={output}
                  alt="output"
                  width={400}
                  height={400}
                  className="rounded border object-contain bg-neutral-800"
                />
                <a
                  href={output}
                  download={`converted.${format}`}
                  className="bg-green-600 hover:bg-green-700 rounded px-4 py-2 font-semibold text-white mt-2"
                >
                  Download
                </a>
              </div>
            )}
          </>
        )
      case 'convert-file':
        return (
          <div className="flex flex-col gap-2">
            <button
              className="bg-yellow-600 hover:bg-yellow-700 rounded px-4 py-2 font-semibold"
              onClick={handleConvertPDF}
              disabled={!src}
            >
              Convert to PDF
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 rounded px-4 py-2 font-semibold"
              onClick={handleConvertExcel}
              disabled={!src}
            >
              Convert to Excel
            </button>
            <div className="text-xs text-gray-400 mt-2">
              * Excel export chỉ hỗ trợ dữ liệu, không nhúng ảnh trực tiếp.<br />
              * PDF sẽ nhúng ảnh vào file.
            </div>
          </div>
        )
      case 'resize-image':
        return (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <label>Width:</label>
              <input
                type="number"
                min={1}
                value={resizeW}
                onChange={e => setResizeW(Number(e.target.value))}
                className="w-20 border rounded px-1 text-white"
                placeholder="Width"
              />
              <label>Height:</label>
              <input
                type="number"
                min={1}
                value={resizeH}
                onChange={e => setResizeH(Number(e.target.value))}
                className="w-20 border rounded px-1 text-white"
                placeholder="Height"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 rounded px-3 py-1 font-semibold ml-2"
                onClick={handleResizePreview}
                disabled={!src || !resizeW || !resizeH}
              >
                Preview
              </button>
            </div>
            {resizePreview && (
              <div className="flex flex-col items-center gap-2 mt-2">
                <Image
                  src={resizePreview}
                  alt="resized"
                  width={400}
                  height={400}
                  className="rounded border object-contain bg-neutral-800"
                />
                <button
                  className="bg-green-600 hover:bg-green-700 rounded px-4 py-2 font-semibold text-white"
                  onClick={handleDownloadResize}
                >
                  Download Resized
                </button>
              </div>
            )}
          </div>
        )
      case 'compress-image':
        return (
          <div>
            <div className="flex gap-2 items-center mb-2">
              <label>Quality:</label>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.01}
                value={quality}
                onChange={e => setQuality(Number(e.target.value))}
                className="w-24"
              />
              <span>{Math.round(quality * 100)}%</span>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold"
              onClick={() => {
                if (!src) return
                const img = new window.Image()
                img.onload = () => {
                  const canvas = document.createElement('canvas')
                  canvas.width = img.width
                  canvas.height = img.height
                  const ctx = canvas.getContext('2d')
                  if (!ctx) return
                  ctx.drawImage(img, 0, 0)
                  const dataUrl = canvas.toDataURL('image/jpeg', quality)
                  setOutput(dataUrl)
                }
                img.src = src
              }}
              disabled={!src}
            >
              Compress
            </button>
            {output && (
              <div className="flex flex-col items-center gap-2 mt-4">
                <Image
                  src={output}
                  alt="compressed"
                  width={400}
                  height={400}
                  className="rounded border object-contain bg-neutral-800"
                />
                <a
                  href={output}
                  download="compressed.jpg"
                  className="bg-green-600 hover:bg-green-700 rounded px-4 py-2 font-semibold text-white mt-2"
                >
                  Download
                </a>
              </div>
            )}
          </div>
        )
      case 'crop-image':
        return (
          <div>
            <div className="flex gap-2 items-center mb-2">
              <label>Width:</label>
              <input type="number" min={1} value={resizeW} onChange={e => setResizeW(Number(e.target.value))} className="w-20 border rounded px-1 text-white" />
              <label>Height:</label>
              <input type="number" min={1} value={resizeH} onChange={e => setResizeH(Number(e.target.value))} className="w-20 border rounded px-1 text-white" />
              <button
                className="bg-blue-500 hover:bg-blue-700 rounded px-3 py-1 font-semibold ml-2"
                onClick={() => {
                  if (!src || !resizeW || !resizeH) return
                  const img = new window.Image()
                  img.onload = () => {
                    const canvas = document.createElement('canvas')
                    canvas.width = resizeW
                    canvas.height = resizeH
                    const ctx = canvas.getContext('2d')
                    if (!ctx) return
                    ctx.drawImage(img, 0, 0, resizeW, resizeH, 0, 0, resizeW, resizeH)
                    setResizePreview(canvas.toDataURL())
                  }
                  img.src = src
                }}
                disabled={!src || !resizeW || !resizeH}
              >
                Crop
              </button>
            </div>
            {resizePreview && (
              <div className="flex flex-col items-center gap-2 mt-2">
                <Image
                  src={resizePreview}
                  alt="cropped"
                  width={400}
                  height={400}
                  className="rounded border object-contain bg-neutral-800"
                />
                <button
                  className="bg-green-600 hover:bg-green-700 rounded px-4 py-2 font-semibold text-white"
                  onClick={() => {
                    if (!resizePreview) return
                    const link = document.createElement('a')
                    link.href = resizePreview
                    link.download = 'cropped-image.png'
                    link.click()
                  }}
                >
                  Download Cropped
                </button>
              </div>
            )}
          </div>
        )
      case 'image-to-base64':
        return (
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold"
              onClick={() => {
                if (!src) return
                setOutput(src)
              }}
              disabled={!src}
            >
              Convert to Base64
            </button>
            {output && (
              <textarea
                className="w-full mt-2 text-xs text-white rounded p-2"
                rows={6}
                value={output}
                readOnly
              />
            )}
          </div>
        )
      case 'svg-optimizer':
        return (
          <div>
            <label
              htmlFor="svg-upload"
              className="cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition-colors duration-150 mb-2"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 16v-8m0 0l-4 4m4-4l4 4M4 20h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {output ? 'Chọn SVG khác' : 'Chọn tệp SVG'}
            </label>
            <input
              id="svg-upload"
              type="file"
              accept=".svg"
              onChange={async e => {
                const file = e.target.files?.[0]
                if (!file) return
                const text = await file.text()
                // Loại bỏ comment và whitespace đơn giản
                const optimized = text.replace(/<!--[\s\S]*?-->/g, '').replace(/\s{2,}/g, ' ')
                setOutput(optimized)
              }}
              className="hidden"
            />
            {output && (
              <>
                <textarea className="w-full mt-2 text-xs text-white rounded p-2" rows={8} value={output} readOnly />
                <a
                  href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(output)}`}
                  download="optimized.svg"
                  className="bg-green-600 hover:bg-green-700 rounded px-4 py-2 font-semibold text-white mt-2 inline-block"
                >
                  Download SVG
                </a>
              </>
            )}
          </div>
        )
      case 'metadata-viewer':
        return (
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold"
              onClick={async () => {
                if (!src) return
                const res = await exifr.parse(src)
                setOutput(JSON.stringify(res, null, 2))
              }}
              disabled={!src}
            >
              Xem metadata
            </button>
            {output && (
              <textarea className="w-full mt-2 text-xs text-white rounded p-2" rows={8} value={output} readOnly />
            )}
          </div>
        )
      case 'watermark':
        return (
          <div>
            <input
              type="text"
              placeholder="Nhập watermark text"
              className="w-full border rounded px-2 py-1 text-white mb-2"
              value={watermarkText}
              onChange={e => setWatermarkText(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold"
              onClick={() => {
                if (!src || !watermarkText) return
                const img = new window.Image()
                img.onload = () => {
                  const canvas = document.createElement('canvas')
                  canvas.width = img.width
                  canvas.height = img.height
                  const ctx = canvas.getContext('2d')
                  if (!ctx) return
                  ctx.drawImage(img, 0, 0)
                  ctx.font = `${Math.floor(canvas.height / 12)}px Arial`
                  ctx.fillStyle = 'rgba(255,255,255,0.7)'
                  ctx.textAlign = 'center'
                  ctx.fillText(watermarkText, canvas.width / 2, canvas.height - 20)
                  setResizePreview(canvas.toDataURL())
                }
                img.src = src
              }}
              disabled={!src || !watermarkText}
            >
              Add Watermark
            </button>
            {resizePreview && (
              <div className="flex flex-col items-center gap-2 mt-2">
                <Image
                  src={resizePreview}
                  alt="watermarked"
                  width={400}
                  height={400}
                  className="rounded border object-contain bg-neutral-800"
                />
                <button
                  className="bg-green-600 hover:bg-green-700 rounded px-4 py-2 font-semibold text-white"
                  onClick={() => {
                    if (!resizePreview) return
                    const link = document.createElement('a')
                    link.href = resizePreview
                    link.download = 'watermarked-image.png'
                    link.click()
                  }}
                >
                  Download Watermarked
                </button>
              </div>
            )}
          </div>
        )
      case 'color-palette':
        return (
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold"
              onClick={() => {
                if (!src) return
                const img = new window.Image()
                img.crossOrigin = 'Anonymous'
                img.onload = () => {
                  const canvas = document.createElement('canvas')
                  canvas.width = img.width
                  canvas.height = img.height
                  const ctx = canvas.getContext('2d')
                  if (!ctx) return
                  ctx.drawImage(img, 0, 0)
                  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
                  const colors: Record<string, number> = {}
                  for (let i = 0; i < data.length; i += 4) {
                    const rgb = `${data[i]},${data[i + 1]},${data[i + 2]}`
                    colors[rgb] = (colors[rgb] || 0) + 1
                  }
                  // Lấy 5 màu xuất hiện nhiều nhất
                  const palette = Object.entries(colors)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([rgb]) => `rgb(${rgb})`)
                  setOutput(JSON.stringify(palette, null, 2))
                }
                img.src = src
              }}
              disabled={!src}
            >
              Extract Palette
            </button>
            {output && (
              <div className="flex gap-2 mt-2">
                {JSON.parse(output).map((color: string, idx: number) => (
                  <div key={idx} className="w-8 h-8 rounded" style={{ background: color }} title={color}></div>
                ))}
              </div>
            )}
          </div>
        )
      case 'favicon-generator':
        return (
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-semibold"
              onClick={() => {
                if (!src) return
                const img = new window.Image()
                img.onload = () => {
                  [16, 32, 48, 64].forEach(size => {
                    const canvas = document.createElement('canvas')
                    canvas.width = size
                    canvas.height = size
                    const ctx = canvas.getContext('2d')
                    if (!ctx) return
                    ctx.drawImage(img, 0, 0, size, size)
                    const url = canvas.toDataURL('image/png')
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `favicon-${size}x${size}.png`
                    link.click()
                  })
                }
                img.src = src
              }}
              disabled={!src}
            >
              Generate Favicon PNG (16/32/48/64px)
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <MainLayout>
        <div className="bg-[#23272f] text-white flex w-full">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-neutral-800 flex flex-col py-8 px-4 gap-2">
                <h2 className="text-xl font-bold mb-6">🛠️ Tools</h2>
                {Object.entries(TOOL_LABELS).map(([key, label]) => (
                <button
                    key={key}
                    className={`text-left px-3 py-2 rounded font-semibold transition-colors duration-150 ${
                    activeTool === key ? 'bg-blue-600 text-white' : 'hover:bg-neutral-800 text-gray-200'
                    }`}
                    onClick={() => handleChangeTool(key as ToolType)}
                >
                    {label}
                </button>
                ))}
            </aside>
            {/* Main content */}
            <main className="flex-1 flex flex-col items-center justify-center py-8 px-2">
                <h1 className="text-3xl font-bold mb-8 tracking-tight">{TOOL_LABELS[activeTool]}</h1>
                <div
                className="bg-neutral-900 rounded-xl p-10 flex flex-col gap-8 w-full max-w-4xl mx-auto min-h-[520px] justify-center items-center shadow-2xl"
                >
                {/* Upload (chỉ hiện với các tool ảnh) */}
                {[
                    'convert-image',
                    'convert-file',
                    'resize-image',
                    'compress-image',
                    'crop-image',
                    'image-to-base64',
                    'metadata-viewer',
                    'batch-convert',
                    'watermark',
                    'color-palette',
                    'favicon-generator',
                ].includes(activeTool) && (
                    <>
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-150 mb-4 text-lg shadow"
                    >
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 16v-8m0 0l-4 4m4-4l4 4M4 20h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {src ? 'Chọn ảnh khác' : 'Chọn ảnh'}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        ref={fileInput}
                        onChange={handleFile}
                        className="hidden"
                    />
                    {src && (
                        <div className="flex justify-center w-full">
                        <div className="relative rounded-xl border-4 border-blue-500 shadow-lg bg-neutral-800 max-h-[400px] max-w-[80%] aspect-video mx-auto overflow-hidden">
                            <Image
                            src={src}
                            alt="preview"
                            fill
                            style={{ objectFit: 'contain' }}
                            className="rounded-xl"
                            priority
                            />
                        </div>
                        </div>
                    )}
                    </>
                )}
                {/* Tool content */}
                {[
                    'convert-image',
                    'convert-file',
                    'resize-image',
                    'compress-image',
                    'crop-image',
                    'image-to-base64',
                    'svg-optimizer',
                    'metadata-viewer',
                    'batch-convert',
                    'watermark',
                    'color-palette',
                    'qr-generator',
                    'favicon-generator',
                ].includes(activeTool)
                    ? (
                    <div className="w-full flex flex-col items-center">
                        {renderTool()}
                    </div>
                    )
                    : (
                    <div className="text-center text-gray-400 py-12 w-full">
                        Chức năng đang phát triển.
                    </div>
                    )
                }
                </div>
            </main>
        </div>
    </MainLayout>
  )
}