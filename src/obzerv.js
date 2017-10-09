const obzerv = () => {
  // feature check
  if (!('IntersectionObserver' in window)) {
    throw new Error('Intersection Observer is not supported in your browser: http://caniuse.com/#search=IntersectionObserver')
  }

  const cache = {}

  // options:
    // - node
    // - offset (relative to edges of viewport)
    // - callback (function passed the node)
  const add = callback => options => {
    let observer

    // check for existing observer by offset
    const cached = cache[options.offset]

    if (cached) {
      // add to existing observer
      observer = cached
      observer.observe(options.node)
    } else {
      // define change handler
      // passes the changed node and current instersecting status to the callback function
      const onChange = entries => {
        entries.forEach(entry => callback(entry.target, entry.isIntersecting))
      }

      // create new observer
      observer = new window.IntersectionObserver(onChange, {
        root: null,             // relative to the viewport
        rootMargin: '0px',      // TODO: calculate top/right/bottom/left px relative to options.offset and window.innerWidth/Height
        threshold: .01          // any amount visible
      })

      // observe the element
      observer.observe(options.node)

      // cache the observer
      cache[options.offset] = observer
    }
  }

  return {
    add
  }
}

export default obzerv
