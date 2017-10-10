# obzerv

[![obzerv on Travis](https://img.shields.io/travis/callmecavs/obzerv.svg?style=flat-square)](https://travis-ci.org/callmecavs/obzerv) [![obzerv on NPM](https://img.shields.io/npm/v/obzerv.svg?style=flat-square)](https://www.npmjs.com/package/obzerv) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

A wrapper around [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for handling elements entering and exiting the viewport.

## Install

```sh
$ npm i obzerv --save
```

## API

### .create(options)

Accepts an object with `callback` and `offset` properties.

```javascript
import obzerv from 'obzerv'

// example: lazy loading an image
const callback = (inview, node, untrack) => {
  // exit early if image not in viewport
  if (!inview) {
    return
  }

  // set src attribute of the image, using value stored in data-src attribute
  node.setAttribute('src', node.getAttribute('data-src'))

  // stop tracking image, because load attempt has been initiated
  untrack()
}

// create an observer by passing the callback and offset (relative to the viewport edges)
const observer = Obzerv.create({
  callback,
  offset: .5
})
```

Returns an observer instance with a `track` function used to add nodes to the observer.

A single instance of IntersectionObserver is created, making it more performant to track numerous elements.

```javascript
// add all .box elements to the observer
Array
  .from(document.querySelectorAll('.box'))
  .forEach(box => observer.track(box))
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Michael Cavalea
