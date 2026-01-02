import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

export default function Track({ url }) {
  const ref = useRef(null)

  useEffect(() => {
    const ws = WaveSurfer.create({
      container: ref.current,
      waveColor: '#666',
      progressColor: '#22c55e',
      height: 64,
      backend: 'MediaElement'
    })

    ws.load(url)
    return () => ws.destroy()
  }, [url])

  return <div ref={ref} />
}

