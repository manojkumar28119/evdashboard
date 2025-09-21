import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { type EVRecord } from "../../data/evData";

interface RangeDistributionChartProps {
  data: EVRecord[];
}

export const RangeDistributionChart = ({ data }: RangeDistributionChartProps) => {
  // Group vehicles by range buckets
  const rangeBuckets = [
    { range: "0-50", min: 0, max: 50 },
    { range: "51-100", min: 51, max: 100 },
    { range: "101-150", min: 101, max: 150 },
    { range: "151-200", min: 151, max: 200 },
    { range: "201-250", min: 201, max: 250 },
    { range: "251-300", min: 251, max: 300 },
    { range: "300+", min: 301, max: Infinity }
  ];

  const rangeData = rangeBuckets.map(bucket => {
    const count = data.filter(vehicle =>
      vehicle.electricRange >= bucket.min &&
      vehicle.electricRange <= bucket.max &&
      vehicle.electricRange > 0
    ).length;
    
    return {
      range: bucket.range,
      vehicles: count
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-card-foreground">Range: {label} miles</p>
          <p className="text-electric-green">
            Vehicles: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Electric Range Distribution</CardTitle>
        <CardDescription>
          Distribution of vehicles by electric range capacity (miles)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rangeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="range" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="vehicles" 
                stroke="hsl(var(--electric-green))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--electric-green))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "hsl(var(--electric-green-light))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};