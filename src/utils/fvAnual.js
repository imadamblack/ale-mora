export default function fvAnual(payment, edad) {
  const savingYears = 65 - parseInt(edad);

  console.log('payment', payment);
  console.log('edad', edad);

  const formatoMXN = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  });

  let balance = 0;
  for (let i = 0; i < savingYears; i++) {
    balance += payment * 12;
    balance *= (1 + .12);
  }
  return formatoMXN.format(balance);
}