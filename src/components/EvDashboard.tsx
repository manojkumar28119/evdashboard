import { Car, Zap, MapPin, TrendingUp, Battery, Award, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  getTotalVehicles,
  getAverageRange,
  getMostPopularMake,
  getLatestModelYear
} from "../data/evData";
import { MetricCard } from "./dashboard/MetricCard";
import type { EVRecord } from "../data/evData";
import { EVMakeChart } from "./dashboard/EVMakeChart";
import { RangeDistributionChart } from "./dashboard/RangeDistributionChart";
import { CountyDistributionChart } from "./dashboard/CountyDistributionChart";
import { YearTrendChart } from "./dashboard/YearTrendChart";
import { VehicleDataTable } from "./dashboard/VehicleDataTable";

import csvData from "../data/Electric_Vehicle_Population_Data.csv?raw";

export const EVDashboard = () => {

  const [data, setData] = useState<EVRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const totalVehicles = getTotalVehicles(data);
  const averageRange = Math.round(getAverageRange(data));
  const popularMake = getMostPopularMake(data);
  const latestYear = getLatestModelYear(data);
  const eligibleCount = data.filter(v => v.cafvEligibility.includes("Eligible")).length;
  const uniqueCounties = new Set(data.map(v => v.county)).size;

  useEffect(() => {
    Papa.parse(csvData, {
      header: true,
      complete: (res) => {
        const transformedData = res.data
          .filter((item: any) => item && typeof item === 'object')
          .map((item: any) => {
            return {
            vin: item["VIN (1-10)"] || '',
            county: item.County || '',
            city: item.City || '',
            state: item.State || '',
            postalCode: item["Postal Code"] || '',
            modelYear: parseInt(item["Model Year"]) || 0,
            make: item.Make || '',
            model: item.Model || '',
            electricVehicleType: item["Electric Vehicle Type"] || '',
            cafvEligibility: item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] || '',
            electricRange: parseInt(item["Electric Range"]) || 0,
            baseMSRP: parseInt(item["Base MSRP"]) || 0,
            legislativeDistrict: item["Legislative District"] || '',
            dolVehicleId: item["DOL Vehicle ID"] || '',
            vehicleLocation: item["Vehicle Location"] || '',
            electricUtility: item["Electric Utility"] || '',
            censusTract: item["2020 Census Tract"] || '',
          }
          });
        setData(transformedData);
        setLoading(false);
      },
    });
  }, []);

  console.log("Loaded EV Data:", data);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden border-b">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-electric-green opacity-95" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-green/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                Electric Vehicle Dashboard
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1 w-12 bg-white/60 rounded-full" />
                <div className="h-1 w-8 bg-electric-green-light rounded-full" />
                <div className="h-1 w-4 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
          <p className="text-white/90 text-xl max-w-2xl leading-relaxed">
            Comprehensive insights into Washington State electric vehicle registrations, 
            trends, and adoption patterns
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
              <Battery className="h-4 w-4 text-white" />
              <span className="text-white font-medium">Real-time Data</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
              <MapPin className="h-4 w-4 text-white" />
              <span className="text-white font-medium">Statewide Coverage</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
              <TrendingUp className="h-4 w-4 text-white" />
              <span className="text-white font-medium">Growth Analytics</span>
            </div>
          </div>
        </div>


      </div>
            <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <MetricCard
            title="Total Vehicles"
            value={totalVehicles.toLocaleString()}
            description="Registered EVs"
            icon={Car}
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricCard
            title="Average Range"
            value={`${averageRange} mi`}
            description="Electric range"
            icon={Battery}
            trend={{ value: 8.2, isPositive: true }}
          />
          <MetricCard
            title="Top Make"
            value={popularMake}
            description="Most popular"
            icon={Award}
            trend={{ value: 15.3, isPositive: true }}
          />
          <MetricCard
            title="Latest Model"
            value={latestYear}
            description="Newest year"
            icon={TrendingUp}
          />
          <MetricCard
            title="CAFV Eligible"
            value={`${Math.round((eligibleCount / totalVehicles) * 100)}%`}
            description={`${eligibleCount} vehicles`}
            icon={Zap}
            trend={{ value: 5.7, isPositive: true }}
          />
          <MetricCard
            title="Counties"
            value={uniqueCounties}
            description="Coverage area"
            icon={MapPin}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EVMakeChart data={data} />
          <RangeDistributionChart data={data} />
          <CountyDistributionChart data={data} />
          <YearTrendChart data={data} />
        </div>

        {/* Data Table */}
        <div className="grid grid-cols-1 gap-6">
          <VehicleDataTable data={data} />
        </div>
        </div>
    </div>
  );
};