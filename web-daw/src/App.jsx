import { useState } from 'react'
import Upload from './components/Upload'
import TrackList from './components/TrackList'
import ExportPanel from './components/ExportPanel'

export default function App() {
  const [tracks, setTracks] = useState([])

  const addTrack = (url) => {
    setTracks(t => [...t, { id: crypto.randomUUID(), url }])
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">🎛 Web DAW</h1>
      <Upload onLoad={addTrack} />
      <TrackList tracks={tracks} />
      {tracks.length > 0 && <ExportPanel tracks={tracks} />}
    </div>
  )
}

