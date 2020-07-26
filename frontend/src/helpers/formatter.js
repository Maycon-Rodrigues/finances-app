const numberFormatter = Intl.NumberFormat('pt-BR');
const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(number) {
  const n = number.toString();

  if (n.length === 1) {
    return n.padStart(2, '0');
  }
  return numberFormatter.format(n);
}

function formatMoney(number) {
  return moneyFormatter.format(number);
}

export { formatNumber, formatMoney };
