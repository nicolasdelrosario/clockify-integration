export const calculateTotalPayment = (totalHours, paymentPerHour) => {
  if (totalHours === 0 || paymentPerHour <= 0) return 0

  const IGV = 0.18
  const withoutIGV = totalHours * paymentPerHour
  const withIGV = withoutIGV * (1 + IGV)

  return Math.ceil(withIGV * 100) / 100
}
