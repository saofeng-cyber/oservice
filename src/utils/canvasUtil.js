const getRingIconUrl = ({ color = '#000', size = 18}) => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const cxt = canvas.getContext('2d')
  cxt.strokeStyle = color
  cxt.lineWidth = 2
  const radius = size * 0.4
  cxt.arc(size / 2, radius + 1, radius, 0, Math.PI * 2)
  cxt.stroke()
  cxt.lineWidth = 3
  cxt.beginPath()
  cxt.moveTo(size / 2, 1.6 * radius)
  cxt.lineTo(size / 2, size)
  cxt.stroke()
  return canvas.toDataURL()
}

export {
  getRingIconUrl
}