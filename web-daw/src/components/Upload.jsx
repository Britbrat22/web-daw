export default function Upload({ onLoad }) {
  const handle = e => {
    const f = e.target.files[0]
    if (f && f.type.startsWith('audio/')) {
      onLoad(URL.createObjectURL(f))
    }
  }

  return <input type="file" accept="audio/*" onChange={handle} />
}

