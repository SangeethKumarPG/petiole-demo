export function formatCurrency(amount: number, currencyCode: string ="AED"):string{
  try{
    return new Intl.NumberFormat("en-AE",{
      style: 'currency',
      currency: currencyCode.toUpperCase(),
      currencyDisplay: 'symbol'
    }).format(amount);
  }catch(error){
    console.error("Invalid currency code", error);
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`
  }
}