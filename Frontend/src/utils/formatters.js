export const formatPrice = (price, priceType = 'monthly') => {
  const formatter = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  });

  const formattedPrice = formatter.format(price);
  
  switch (priceType) {
    case 'daily':
      return `${formattedPrice}/day`;
    case 'monthly':
      return `${formattedPrice}/month`;
    case 'yearly':
      return `${formattedPrice}/year`;
    default:
      return formattedPrice;
  }
};

export const getSustainabilityColor = (score) => {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-yellow-600';
  if (score >= 4) return 'text-orange-600';
  return 'text-red-600';
};

export const getSustainabilityLabel = (score) => {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Fair';
  return 'Poor';
};