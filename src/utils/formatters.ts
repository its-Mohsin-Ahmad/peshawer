export function formatPKR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rs. 0';
  return 'Rs. ' + amount.toLocaleString('en-PK');
}

export function formatPKRShort(amount: number): string {
  if (amount >= 10000000) {
    const crore = (amount / 10000000).toFixed(2).replace(/\.00$/, '');
    return `${crore} Crore`;
  }
  if (amount >= 100000) {
    const lac = (amount / 100000).toFixed(2).replace(/\.00$/, '');
    return `${lac} Lac`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}k`;
  }
  return amount.toString();
}

export function formatArea(area: number, unit: string): string {
  return `${area.toLocaleString()} ${unit}`;
}

export function validatePaymentTotals(
  booking: number,
  monthlyInstallment: number,
  monthlyCount: number,
  halfYearlyInstallment: number,
  halfYearlyCount: number,
  possession: number,
  totalPrice: number
) {
  const monthlyTotal = monthlyInstallment * monthlyCount;
  const halfYearlyTotal = halfYearlyInstallment * halfYearlyCount;
  const calculatedTotal = booking + monthlyTotal + halfYearlyTotal + possession;
  const diff = calculatedTotal - totalPrice;
  const isValid = diff === 0;

  return {
    monthlyTotal,
    halfYearlyTotal,
    calculatedTotal,
    expectedTotal: totalPrice,
    isValid,
    difference: diff,
  };
}

