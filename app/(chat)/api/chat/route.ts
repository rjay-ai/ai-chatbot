// app/(chat)/compare/page.tsx
'use client';
import { useState } from 'react';

export default function CompareJDs() {
  const [files, setFiles] = useState<{
    jd1: File | null;
    jd2: File | null;
  }>({
    jd1: null,
    jd2: null
  });
  const [texts, setTexts] = useState({
    jd1: '',
    jd2: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'jd1' | 'jd2') => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'jd1' | 'jd2') => {
    setTexts(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (files.jd1 || files.jd2) {
        // Handle file upload comparison
        const formData = new FormData();
        if (files.jd1) formData.append('jd1', files.jd1);
        if (files.jd2) formData.append('jd2', files.jd2);

        const response = await fetch('/api/chat', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        setResult(data.comparison);
      } else {
        // Handle text comparison
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'compare_jd',
            content: {
              jd1: texts.jd1,
              jd2: texts.jd2
            }
          })
        });
        const data = await response.json();
        setResult(data.comparison);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Compare Job Descriptions</h1>

      <form onSubmit={handleCompare} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* First JD */}
          <div className="space-y-4">
            <h3 className="font-medium">First Job Description</h3>
            <div className="p-4 border rounded bg-gray-50">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, 'jd1')}
                className="w-full mb-2"
              />
              <div className="text-sm text-gray-500">or</div>
              <textarea
                value={texts.jd1}
                onChange={(e) => handleTextChange(e, 'jd1')}
                placeholder="Paste job description here..."
                className="w-full h-64 p-2 border rounded mt-2"
                disabled={!!files.jd1}
              />
            </div>
          </div>

          {/* Second JD */}
          <div className="space-y-4">
            <h3 className="font-medium">Second Job Description</h3>
            <div className="p-4 border rounded bg-gray-50">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, 'jd2')}
                className="w-full mb-2"
              />
              <div className="text-sm text-gray-500">or</div>
              <textarea
                value={texts.jd2}
                onChange={(e) => handleTextChange(e, 'jd2')}
                placeholder="Paste job description here..."
                className="w-full h-64 p-2 border rounded mt-2"
                disabled={!!files.jd2}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || (!texts.jd1 && !files.jd1) || (!texts.jd2 && !files.jd2)}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Comparing...' : 'Compare JDs'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        </div>
      )}
    </div>
  );
}
