import LUNAR_MAP from './lunar.1900.2100.data';


const START_YEAR = 1900;
const END_YEAR = 2100;


class Lunar {
  constructor(date) {
    this.solar = date || new Date();
    const obj = solar2Lunar(date);
    if (null === obj) {
      throw new Error('unknown error.');
    }
    this.lunar = obj.lunar;
  }

  static solar2Lunar = _solar2Lunar;
  static lunar2Solar = _lunar2Solar;
}


const _lunar2Solar = (lunar, leap=false) => {
  if (lunar.year <= START_YEAR || lunar.year >= END_YEAR) {
    throw new Error('Invalid date: (1900, 2100) ' + date.toString());
  }
  const offset = lunar.year - START_YEAR;
  const leapMonth = LUNAR_MAP[offset][0];

  if ((leap && leapMonth == lunar.month)
      || ((leapMonth > 0 && lunar.month > leapMonth))) {
    lunar.month++;
  }

  const str = LUNAR_MAP[offset][lunar.month];
  let sMonth = Number(str.substring(0, 2))
  const sDate = Number(str.substring(2, 4));

  if (sMonth > 12) {
    lunar.year++;
    sMonth -= 12;
  };

  const solar = new Date(lunar.year, sMonth - 1, sDate);
  const time = solar.getTime() + ((lunar.date - 1) * 24 * 60 * 60 * 1000);
  return new Date(time);
};


const _retrieval = (mapping, solar, pre=false) => {

  const first = {year: solar.year, month: null, date: null};

  let month = mapping.length-1;
  const lunar = {year: pre ? solar.year-1 : solar.year,month: month,date: null};

  do {

    first.month = Number(mapping[month].substring(0, 2));
    first.date = Number(mapping[month].substring(2, 4));
    if (first.month < solar.month || (first.month == solar.month && solar.date >= first.date)) {
      break;
    }

    if (pre && first.month > 12) {
      first.month = first.month % 12;
      break;
    }

    lunar.month = --month;
  } while(month > 0);

  if (month <= 0) { return null; }

  const fDate = new Date(solar.year, first.month - 1, first.date);
  const sDate = new Date(solar.year, solar.month - 1, solar.date);
  lunar.date = Math.ceil((sDate.getTime() - fDate.getTime()) / (1000 * 60 * 60 * 24) + 1);

  return {solar: solar, first: first, lunar: lunar, leap: mapping[0]};

};


// 根据阳历日期获取对应的阴历日期
const _solar2Lunar = date => {
  const sYear = date.getFullYear();
  if (sYear <= START_YEAR || sYear >= END_YEAR) {
    throw new Error('Invalid date: (1900, 2100) ' + date.toString());
  }
  const offset = sYear - START_YEAR;
  const solar = _getDateObj(date);

  let ret = _retrieval(LUNAR_MAP[offset], solar);
  ret = ret || _retrieval(LUNAR_MAP[offset-1], solar, true);

  return ret;
};


const _getDateObj = date => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate()
  }
};


const main = () => {
  console.log(_solar2Lunar(new Date('2015-07-12')));
  console.log(_solar2Lunar(new Date('2015-11-13')));
  console.log(_solar2Lunar(new Date('2015-02-11')));
  console.log(_solar2Lunar(new Date('2012-07-12')));
  console.log(_solar2Lunar(new Date('2015-07-12')));
  console.log(_solar2Lunar(new Date('2016-01-10')));


  console.log(_lunar2Solar({year: 2015, month: 2, date: 28}));
  console.log(_lunar2Solar({year: 2016, month: 2, date: 28}));
  console.log(_lunar2Solar({year: 2015, month: 4, date: 28}));
  console.log(_lunar2Solar({year: 2015, month: 10, date: 28}));

}

main();


export default Lunar;

