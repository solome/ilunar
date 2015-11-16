const assert = require('assert');

const Lunar = require('..').default;

const lunar2Solar = Lunar.lunar2Solar;
const solar2Lunar = Lunar.solar2Lunar;


describe('ilunar', function() {
  describe('#solar2Lunar()', function () {
    it('debug: solar => lunar', function () {

      var ret = solar2Lunar(new Date('2018-01-01'));
      assert.equal(ret.first.year, 2017);
      assert.equal(ret.first.month, 12);
      assert.equal(ret.first.date, 18);

      assert.equal(ret.lunar.year, 2017);
      assert.equal(ret.lunar.month, 11);
      assert.equal(ret.lunar.date, 15);

      assert.equal(ret.leap, 6);
    });

    it('debug: lunar => solor', function () {

      var ret = lunar2Solar({year: 2015, month: 2, date: 28});
      assert.equal(ret.getFullYear(), 2015);
      assert.equal(ret.getMonth(), 3);
      assert.equal(ret.getDate(), 16);

    });
  });
});

