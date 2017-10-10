const obzerv = () => {
  // feature check
  if (!('IntersectionObserver' in window)) {
    throw new Error('IntersectionObserver is not supported, see: http://caniuse.com/#search=IntersectionObserver')
  }

  // options:
    // - offset (relative to edges of viewport)
    // - callback (function)
  const create = options => {
    // define change handler
    const change = (entries, observer) => {
      // for each change
      entries.forEach(entry => {
        // define untrack helper
        const untrack = () => observer.unobserve(entry.target)

        // pass params to provided callback function
        options.callback(
          entry.target,                 // current node
          entry.isIntersecting,         // boolean indicating inview status
          untrack                       // function to unobserve the current node
        )
      })
    }

    // create observer instance using change handler
    const observer = new window.IntersectionObserver(change, {
      root: null,             // relative to the viewport
      rootMargin: '0px',      // FIXME: calculate top/right/bottom/left px relative to options.offset and window.innerWidth/Height
      threshold: 0.01         // any amount visible
    })

    // return a method that adds a node to the observer
    return {
      track: node => observer.observe(node)
    }
  }

  return { create }
}

const singleton = obzerv()

export default singleton
