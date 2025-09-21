// Mock Electric Vehicle Data for Dashboard
export interface EVRecord {
  vin: string;
  county: string;
  city: string;
  state: string;
  postalCode: string;
  modelYear: number;
  make: string;
  model: string;
  electricVehicleType: string;
  cafvEligibility: string;
  electricRange: number;
  baseMSRP: number;
  legislativeDistrict: string;
  dolVehicleId: string;
  vehicleLocation: string;
  electricUtility: string;
  censusTract: string;
}


// Utility functions for data analysis
export const getUniqueValues = (data: EVRecord[], field: keyof EVRecord): string[] => {
  return [...new Set(data.map(item => String(item[field])))];
};

export const getCountByField = (data: EVRecord[], field: keyof EVRecord) => {
  const counts: Record<string, number> = {};
  data.forEach(item => {
    const value = String(item[field]);
    counts[value] = (counts[value] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

export const getAverageRange = (data: EVRecord[]): number => {
  const validRanges = data.filter(item => item.electricRange > 0);
  return validRanges.length > 0 
    ? validRanges.reduce((sum, item) => sum + item.electricRange, 0) / validRanges.length 
    : 0;
};

export const getTotalVehicles = (data: EVRecord[]): number => data.length;

export const getMostPopularMake = (data: EVRecord[]): string => {
  const counts = getCountByField(data, 'make');
  return counts.sort((a, b) => b.value - a.value)[0]?.name || 'N/A';
};

export const getLatestModelYear = (data: EVRecord[]): number => {
  return Math.max(...data.map(item => item.modelYear));
};