import { decode } from './audio'

export async function exportWav(urls) {
  const ctx = new AudioContext()
  const buffers = await Promise.all(urls.map(u => decode(ctx, u)))

  const length = Math.max(...buffers.map(b => b.length))
  const offline = new OfflineAudioContext(2, length, ctx.sampleRate)

  buffers.forEach(b => {
    const src = offline.createBufferSource()
    src.buffer = b
    src.connect(offline.destination)
    src.start()
  })

  const rendered = await offline.startRendering()
  const wav = audioBufferToWav(rendered)

  const blob = new Blob([wav], { type: 'audio/wav' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'mixdown.wav'
  a.click()
}

function audioBufferToWav(buffer) {
  const length = buffer.length * 2 * buffer.numberOfChannels
  const view = new DataView(new ArrayBuffer(44 + length))
  let offset = 0

  const write = s => { for (let i=0;i<s.length;i++) 
view.setUint8(offset++, s.charCodeAt(i)) }

  write('RIFF')
  view.setUint32(offset, 36 + length, true); offset += 4
  write('WAVEfmt ')
  view.setUint32(offset, 16, true); offset += 4
  view.setUint16(offset, 1, true); offset += 2
  view.setUint16(offset, buffer.numberOfChannels, true); offset += 2
  view.setUint32(offset, buffer.sampleRate, true); offset += 4
  view.setUint32(offset, buffer.sampleRate * 4, true); offset += 4
  view.setUint16(offset, buffer.numberOfChannels * 2, true); offset += 2
  view.setUint16(offset, 16, true); offset += 2
  write('data')
  view.setUint32(offset, length, true); offset += 4

  const ch = buffer.getChannelData(0)
  for (let i = 0; i < ch.length; i++) {
    view.setInt16(offset, ch[i] * 0x7fff, true)
    offset += 2
  }
  return view
}

