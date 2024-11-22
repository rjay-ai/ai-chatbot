// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">AI Job Description Tool</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* JD Generator Card */}
        <Link href="/generate">
          <div className="p-6 bg-purple-50 rounded-lg hover:bg-purple-100">
            <h2 className="text-xl font-bold text-purple-900">Generate JD</h2>
            <p className="mt-2">Create professional job descriptions using AI</p>
          </div>
        </Link>

        {/* JD Comparison Card */}
        <Link href="/compare">
          <div className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100">
            <h2 className="text-xl font-bold text-blue-900">Compare JDs</h2>
            <p className="mt-2">Compare and analyze two job descriptions</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
