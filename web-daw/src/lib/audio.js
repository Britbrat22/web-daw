export const decode = async (ctx, url) => {
  const res = await fetch(url)
  const buf = await res.arrayBuffer()
  return await ctx.decodeAudioData(buf)
}

