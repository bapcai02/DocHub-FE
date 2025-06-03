"use client"

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Tab } from '@headlessui/react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import MainLayout from '@/components/Home/MainLayout';
import Sidebar from '@/components/Home/Sidebar';
import Filters from '@/components/Home/Filters';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function EditorPreviewPage() {
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
<head>
  <title>My Project</title>
</head>
<body>
  <h1>Hello Capybara!</h1>
  <p>Edit me to see changes</p>
</body>
</html>`);

  const [css, setCss] = useState(`body { 
  background: #d9c1a6; 
  margin: 0; 
  padding: 2rem; 
  font-family: sans-serif; 
  color: #333; 
}

h1 { 
  color: #5c3a21; 
  text-align: center; 
  font-family: 'Arial', sans-serif;
  margin-bottom: 1rem;
}

p {
  text-align: center;
  color: #5c3a21;
  max-width: 600px;
  margin: 0 auto;
}`);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);

  const combined = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

  const handleCopy = () => {
    const content = selectedIndex === 0 ? html : css;
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <MainLayout>
      <Sidebar />
      <section className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden text-white">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold mb-2">Browse all</h1>
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
              Open-Source UI elements made with CSS or Tailwind
          </p>
          <Filters />
        </div>
        <div className={` text-white`}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 p-4`}>
                {/* Preview */}
                <div className={`rounded-lg bg-[#1e1e1e] shadow-lg overflow-hidden border border-[#333] relative`}>
                <iframe
                    ref={previewRef}
                    title="Preview"
                    className="w-full h-full"
                    srcDoc={combined}
                    sandbox="allow-scripts"
                />
                </div>

                {/* Editor */}
                <div className={`bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden border border-[#333]}`}>
                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <Tab.List className="flex space-x-1 bg-[#252526] p-2 border-b border-[#333]">
                    {['HTML', 'CSS'].map((tab) => (
                        <Tab
                        key={tab}
                        className={({ selected }) =>
                            classNames(
                            'px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
                            selected ? 'bg-[#007acc] text-white' : 'text-gray-400 hover:bg-[#333] hover:text-white'
                            )
                        }
                        >
                        {tab}
                        </Tab>
                    ))}
                    <div className="ml-auto flex space-x-1">
                        <button 
                        onClick={handleCopy} 
                        title="Copy" 
                        className="text-gray-400 hover:text-white p-1.5 rounded hover:bg-[#333] transition-colors"
                        >
                        {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                        </button>
                    </div>
                    </Tab.List>

                    <Tab.Panels className="h-[400px]">
                    <Tab.Panel className="h-full">
                        <MonacoEditor
                            language="html"
                            value={html}
                            onChange={(v) => setHtml(v || '')}
                            theme="vs-dark"
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                wordWrap: 'on',
                                formatOnPaste: true,
                                formatOnType: true,
                                tabSize: 2
                            }}
                            height="100%"
                        />
                    </Tab.Panel>
                    <Tab.Panel className="h-full">
                        <MonacoEditor
                            language="css"
                            value={css}
                            onChange={(v) => setCss(v || '')}
                            theme="vs-dark"
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                wordWrap: 'on',
                                formatOnPaste: true,
                                formatOnType: true,
                                tabSize: 2
                            }}
                            height="100%"
                        />
                    </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                </div>
            </div>
        </div>
      </section>
    </MainLayout>
  );
}