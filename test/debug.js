import Lunar from '..';

console.log(Lunar);
const lunar = new Lunar();
console.log(lunar);

console.log(lunar.getYear());
console.log(lunar.getMonth());
console.log(lunar.getDate());

console.log(Lunar.solar2Lunar);
console.log(Lunar.lunar2Solar);

const lunar2Solar = Lunar.lunar2Solar;
const solar2Lunar = Lunar.solar2Lunar;

console.log(lunar2Solar, solar2Lunar);

console.log(solar2Lunar(new Date('2015-07-12')));
console.log(solar2Lunar(new Date('2015-11-13')));
console.log(solar2Lunar(new Date('2015-02-11')));
console.log(solar2Lunar(new Date('2012-07-12')));
console.log(solar2Lunar(new Date('2015-07-12')));
console.log(solar2Lunar(new Date('2016-01-10')));

console.log(lunar2Solar({year: 2015, month: 2, date: 28}));
console.log(lunar2Solar({year: 2016, month: 2, date: 28}));
console.log(lunar2Solar({year: 2015, month: 4, date: 28}));
console.log(lunar2Solar({year: 2015, month: 10, date: 28}));

