const { differenceInCalendarDays } = require('date-fns');
const { formatDistanceToNow } = require('date-fns');
const { format } = require('date-fns');
const ru = require('date-fns/locale/ru');

const daysTillRefund = (bond) => differenceInCalendarDays(new Date(bond[13]), new Date());
const calculateCoupons = (bond) => Math.floor(daysTillRefund(bond) / bond[15]) + 1;

const formattedDateTime = (dateTime) => format(dateTime, 'dd.MM.yyyy HH:mm');

const filterBonds = (bond) => {
  const isOFZ = bond[20].includes('ОФЗ');
  const isValid = isOFZ ? bond[20].includes('ОФЗ-ПД') : true;
  return bond[3] && bond[5] && bond[13] !== '0000-00-00' && bond[34] === 1 && isValid && bond[26] === 'SUR';
};

const mapBondsToStorage = (rawResponse) => {
  const bonds = rawResponse?.securities?.data;
  const marketData = rawResponse?.marketdata?.data;
  let matDate;
  let nextCoupon;
  return bonds
    .filter(filterBonds)
    .map((bond) => {
      const fullPrice = (((+bond[8] * +bond[10]) / 100) + +bond[7]) * 1.00062;
      const couponsLeft = calculateCoupons(bond);
      const profit = couponsLeft * bond[5] * 0.87 + bond[10] - fullPrice;
      const percentProfit = profit / fullPrice;
      const daysTillEnd = daysTillRefund(bond);
      const yearProfit = (percentProfit * 365) / daysTillEnd;
      const duration = marketData.find((data) => data[0] === bond[0])[36];
      try {
        matDate = format(new Date(bond[13]), 'dd.MM.yyyy');
      } catch (err) {
        matDate = 0;
      }
      try {
        nextCoupon = format(new Date(bond[13]), 'dd.MM.yyyy');
      } catch (err) {
        nextCoupon = 0;
      }

      return {
        key: bond[0],
        title: bond[2],
        price: bond[3],
        couponValue: bond[5],
        nextCoupon,
        nkd: bond[7],
        matDate,
        fullPrice,
        couponInterval: bond[15],
        couponsLeft,
        profit,
        yearProfit,
        tillEnd: (new Date(bond[13])) ? formatDistanceToNow(new Date(bond[13]), { locale: ru }) : '-',
        duration,
      };
    })
    .filter((bond) => bond.profit > 0 && bond.yearProfit < 1);
};

exports.mapBondsToStorage = mapBondsToStorage;
exports.formattedDateTime = formattedDateTime;
