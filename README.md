

## ilunar

> :crescent_moon: [阴历](https://en.wikipedia.org/wiki/Lunar_calendar) <=> :sunny: [阳历](https://en.wikipedia.org/wiki/Solar_calendar) 转换工具，支持`(1900, 2100)`年区间。


### Install

```bash
nom install --save ilunar

```


### Useage

```js

import Lunar from 'ilunar';

const lunar = new Lunar();

console.log(lunar.getYear());
console.log(lunar.getMonth());
console.log(lunar.getDate());

console.log(Lunar.solar2Lunar(new Date('2015-02-28')));
console.log(Lunar.lunar2Solar({year: 2015, month: 10, date: 28}));


```

### Debug

```bash

# `npm install babel-cli -g` first
babel-node test/debug.js
```

### License

MIT
