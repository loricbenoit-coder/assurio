export const toBase64 = (file) => new Promise((res, rej) => {
  const r = new FileReader()
  r.onload = () => res(r.result.split(',')[1])
  r.onerror = rej
  r.readAsDataURL(file)
})

export const getMediaType = (file) => ({
  'image/jpeg': 'image/jpeg', 'image/png': 'image/png', 'image/webp': 'image/webp',
  'image/heic': 'image/jpeg', 'application/pdf': 'application/pdf',
}[file.type] || 'image/jpeg')
