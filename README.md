# obzerv

[![obzerv on NPM](https://img.shields.io/npm/v/obzerv.svg?style=flat-square)](https://www.npmjs.com/package/obzerv) [![obzerv Downloads on NPM](https://img.shields.io/npm/dm/obzerv.svg?style=flat-square)](https://www.npmjs.com/package/obzerv) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

A convenient wrapper around [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for tracking element position relative to the viewport.

## Install

```sh
$ npm i obzerv --save
```

## API

### .create(options)

Accepts a config object with `callback` and `offset` properties. Returns an observer instance with a `track` function used to add nodes to the observer.

```javascript
import obzerv from 'obzerv'

// example callback: lazy loading an image
const callback = (node, inview, untrack) => {
  // exit early if image not in viewport
  if (!inview) {
    return
  }

  // set src attribute of the image
  node.setAttribute('src', node.getAttribute('data-src'))

  // stop tracking image, because load attempt has been initiated
  untrack()
}

// create an observer instance
const observer = obzerv.create({
  callback,
  offset: 25
})

// add all .box elements to the observer
Array
  .from(document.querySelectorAll('.box'))
  .forEach(box => observer.track(box))
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Michael Cavalea
