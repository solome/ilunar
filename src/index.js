import LUNAR_MAP from './lunar.1900.2100.data';


const START_YEAR = 1900;
const END_YEAR = 2100;


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
  const lunar = {year: pre ? solar.year-1 : solar.year, month: month, date: null};

  do {

    first.month = Number(mapping[month].substring(0, 2));
    first.date = Number(mapping[month].substring(2, 4));

    if (pre && first.month > 12) {
      first.month = first.month % 12;
    } else if (pre && first.month <= 12) {
      first.year--;
    }

    if (first.year < solar.year || first.month < solar.month || (first.month == solar.month && solar.date >= first.date)) {
      break;
    }

    lunar.month = --month;
  } while(month > 0);

  if (month <= 0) { return null; }

  const fDate = new Date(first.year, first.month - 1, first.date);
  const sDate = new Date(solar.year, solar.month - 1, solar.date);
  lunar.date = Math.ceil((sDate.getTime() - fDate.getTime()) / (1000 * 60 * 60 * 24) + 1);

  const leap = mapping[0];
  if (leap != 0 && leap < lunar.month) {
    lunar.month--;
  }

  return {solar: solar, first: first, lunar: lunar, leap: leap};

};


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


class Lunar {
  constructor(date) {
    this.solar = date || new Date();
    const obj = _solar2Lunar(this.solar);
    if (null === obj) {
      throw new Error('unknown error.');
    }
    this.lunar = obj.lunar;
  }

  getYear() {
    return this.lunar.year;
  };
  getMonth() {
    return this.lunar.month;
  };
  getDate() {
    return this.lunar.date;
  };

  static solar2Lunar = _solar2Lunar;
  static lunar2Solar = _lunar2Solar;
}


export default Lunar;

