const obzerv = () => {
  // feature check
  if (!('IntersectionObserver' in window)) {
    throw new Error('IntersectionObserver is not supported, see: http://caniuse.com/#search=IntersectionObserver')
  }

  const cache = {}

  // options:
    // - offset (relative to edges of viewport)
    // - callback (function passed the node)
  const create = options => {
    let observer

    // check for existing observer by offset
    const cached = cache[options.offset]

    if (cached) {
      // add to existing observer
      observer = cached
    } else {
      // define change handler
      const onChange = (entries, observer) => {
        // for each change
        entries.forEach(entry => {
          // define unobserve helper
          const untrack = () => observer.unobserve(entry.target)

          // pass params to provided callback function
          options.callback(
            entry.isIntersecting,         // boolean indicating inview status
            entry.target,                 // current node
            untrack                       // function to unobserve the current node
          )
        })
      }

      // create new observer
      observer = new window.IntersectionObserver(onChange, {
        root: null,             // relative to the viewport
        rootMargin: '0px',      // FIXME: calculate top/right/bottom/left px relative to options.offset and window.innerWidth/Height
        threshold: 0.01         // any amount visible
      })

      // cache the observer
      cache[options.offset] = observer
    }

    // return a method that adds a node to the observer
    return {
      track: node => observer.observe(node)
    }
  }

  return { create }
}

const singleton = obzerv()

export default singleton
