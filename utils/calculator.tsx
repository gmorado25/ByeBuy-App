export const calculateWorkHours = (args: {
  salary: number;
  rateType: 'monthly' | 'hourly' | 'daily';
  products: { name: string; price: number }[];
  monthlyExpenses?: number;
}): number => {
  const { salary, rateType, products, monthlyExpenses = 0 } = args;

  const totalCost = products.reduce((sum, p) => sum + p.price, 0);
  const adjustedIncome = rateType === 'monthly' ? salary - monthlyExpenses : salary;

  const hourlyRate =
    rateType === 'hourly'
      ? salary
      : rateType === 'daily'
      ? salary / 8
      : adjustedIncome / 160;

  return totalCost / hourlyRate;
};