import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { type EVRecord } from "../../data/evData";

interface VehicleDataTableProps {
  data: EVRecord[];
}

export const VehicleDataTable = ({ data }: VehicleDataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter data based on search term
  const filteredData = data.filter((vehicle) => {
    const searchString = searchTerm.toLowerCase();
    return (
      vehicle.make.toLowerCase().includes(searchString) ||
      vehicle.model.toLowerCase().includes(searchString) ||
      vehicle.city.toLowerCase().includes(searchString) ||
      vehicle.county.toLowerCase().includes(searchString) ||
      vehicle.electricVehicleType.toLowerCase().includes(searchString) ||
      vehicle.modelYear.toString().includes(searchString)
    );
  });
  
  // Show first 10 filtered records for display purposes
  const displayData = filteredData.slice(0, 10);

  const getVehicleTypeBadge = (type: string) => {
    if (type.includes("BEV")) {
      return <Badge className="bg-electric-green text-white">BEV</Badge>;
    } else if (type.includes("PHEV")) {
      return <Badge variant="secondary">PHEV</Badge>;
    }
    return <Badge variant="outline">{type}</Badge>;
  };

  const getEligibilityBadge = (eligibility: string) => {
    if (eligibility.includes("Eligible")) {
      return <Badge className="bg-primary text-primary-foreground">Eligible</Badge>;
    } else if (eligibility.includes("Not eligible")) {
      return <Badge variant="destructive">Not Eligible</Badge>;
    }
    return <Badge variant="outline">Unknown</Badge>;
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Vehicle Registration Details</CardTitle>
        <CardDescription>
          Recent electric vehicle registrations (showing {displayData.length} of {filteredData.length} filtered records)
        </CardDescription>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by make, model, city, county, or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Make/Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Range</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>CAFV Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((vehicle, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {vehicle.make} {vehicle.model}
                  </TableCell>
                  <TableCell>{vehicle.modelYear}</TableCell>
                  <TableCell>
                    {getVehicleTypeBadge(vehicle.electricVehicleType)}
                  </TableCell>
                  <TableCell>
                    {vehicle.electricRange > 0 ? (
                      <span className="text-electric-green font-medium">
                        {vehicle.electricRange} mi
                      </span>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{vehicle.city}</div>
                      <div className="text-muted-foreground">{vehicle.county} County</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getEligibilityBadge(vehicle.cafvEligibility)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};