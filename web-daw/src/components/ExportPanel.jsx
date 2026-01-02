import { exportWav } from '../lib/exportWav'

export default function ExportPanel({ tracks }) {
  const handleExport = async () => {
    await exportWav(tracks.map(t => t.url))
  }

  return (
    <button className="px-4 py-2 bg-green-600" onClick={handleExport}>
      Export WAV
    </button>
  )
}

