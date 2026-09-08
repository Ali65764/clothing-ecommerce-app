export const cdn = (url, width = 500) => {
  if (typeof url !== 'string' || !url.includes('/upload/')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`)
}

export default cdn
