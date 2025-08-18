'use client'

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Something went wrong!
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={() => reset()}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/30"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
