export function checkImgSrc(src, successHandler, errorHandler) {
  const img = new Image()
  img.onload = () => {
    successHandler()
  }
  img.onerror = () => {
    errorHandler()
  }
  img.src = src
}
