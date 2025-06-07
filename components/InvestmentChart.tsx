import { LineChart } from 'react-native-chart-kit';

type InvestmentData = {
  age: string;
  amount: number;
};

type InvestmentChartProps = {
  data: InvestmentData[];
};

export default function InvestmentChart({ data }: InvestmentChartProps) {
  return (
    <LineChart
      data={{
        labels: data.map(d => d.age),
        datasets: [{ data: data.map(d => d.amount) }]
      }}
      width={320}
      height={220}
      chartConfig={{
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#eee",
        decimalPlaces: 2,
        color: () => `rgba(0, 128, 0, 1)`,
      }}
    />
  );
}