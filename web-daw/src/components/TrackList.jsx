import Track from './Track'

export default function TrackList({ tracks }) {
  return (
    <div className="space-y-3">
      {tracks.map(t => (
        <Track key={t.id} url={t.url} />
      ))}
    </div>
  )
}

