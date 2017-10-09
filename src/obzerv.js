const obzerv = () => {
  // feature check
  if (!'IntersectionObserver' in window) {
    throw new Error('Intersection Observer is not supported in your browser: http://caniuse.com/#search=IntersectionObserver')
  }

}

export default obzerv
