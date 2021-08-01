const { differenceInCalendarDays } = require('date-fns');

const daysTillRefund = (bond) => differenceInCalendarDays(new Date(bond[13]), new Date());
const calculateCoupons = (bond) => Math.floor(daysTillRefund(bond) / bond[15]) + 1;

const mapBondsToStorage = (rawResponse) => {
  const bonds = rawResponse?.securities?.data;
  const marketData = rawResponse?.marketdata?.data;
  return bonds
    .map((bond) => {
      const fullPrice = (((+bond[8] * +bond[10]) / 100) + +bond[7]) * 1.00062;
      const couponsLeft = calculateCoupons(bond);
      const profit = couponsLeft * bond[5] * 0.87 + bond[10] - fullPrice;
      const percentProfit = profit / fullPrice;
      const daysTillEnd = daysTillRefund(bond);
      const yearProfit = (percentProfit * 365) / daysTillEnd;
      const duration = marketData.find((data) => data[0] === bond[0])[36];
      return {
        key: bond[0],
        title: bond[2],
        price: bond[3],
        couponValue: bond[5],
        nextCoupon: new Date(bond[6]),
        nkd: bond[7],
        matDate: new Date(bond[13]),
        fullPrice,
        couponInterval: bond[15],
        couponsLeft,
        profit,
        yearProfit,
        daysTillEnd,
        duration,
      };
    })
    .filter((bond) => bond.profit > 0 && bond.yearProfit < 1);
};

module.exports = mapBondsToStorage;
