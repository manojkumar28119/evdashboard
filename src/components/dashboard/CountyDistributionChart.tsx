import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getCountByField, type EVRecord } from "../../data/evData";

interface CountyDistributionChartProps {
  data: EVRecord[];
}

export const CountyDistributionChart = ({ data }: CountyDistributionChartProps) => {
  const allCountyData = getCountByField(data, 'county')
    .sort((a, b) => b.value - a.value);

  // Limit to top 10 counties for legend, combine others
  const topCounties = allCountyData.slice(0, 10);
  const otherCounties = allCountyData.slice(10);
  const otherTotal = otherCounties.reduce((sum, item) => sum + item.value, 0);

  const countyData = otherTotal > 0
    ? [...topCounties, { name: 'Others', value: otherTotal }]
    : topCounties;

  // Color palette for pie chart
  const COLORS = [
    "#1e40af", // Blue
    "#dc2626", // Red
    "#16a34a", // Green
    "#ca8a04", // Yellow
    "#7c3aed", // Purple
    "#0891b2", // Cyan
    "#be123c", // Rose
    "#65a30d", // Lime
    "#c2410c", // Orange
    "#7c2d12"  // Brown
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const payloadData = payload[0].payload;
      const percentage = ((payloadData.value / data.length) * 100).toFixed(1);
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-card-foreground">{payloadData.name} County</p>
          <p className="text-card-foreground">
            Vehicles: <span className="font-bold text-primary">{payloadData.value}</span> ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.08) return null; // Don't show labels for slices smaller than 8%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6; // Position labels closer to center
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="hsl(var(--foreground))"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        fontWeight="700"
        stroke="hsl(var(--background))"
        strokeWidth="2"
        paintOrder="stroke fill"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Geographic Distribution</CardTitle>
        <CardDescription>
          Electric vehicle registration by county
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={countyData}
                cx="50%"
                cy="40%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={150}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {countyData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
                formatter={(value) => `${value}`}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};