# 🚗 EV Dashboard

A comprehensive Electric Vehicle dashboard for analyzing Washington State EV registration data. Built with modern React, TypeScript, and data visualization libraries to provide insights into EV adoption trends, vehicle distribution, and geographical patterns.


## ✨ Features

### 📊 Key Metrics
- **Total Vehicles**: Count of registered EVs
- **Average Range**: Electric range analysis across all vehicles
- **Top Make**: Most popular vehicle manufacturer
- **Latest Model Year**: Newest vehicle registrations
- **CAFV Eligibility**: Clean Alternative Fuel Vehicle program statistics
- **Geographic Coverage**: County-wise distribution

### 📈 Interactive Charts
- **Vehicle Distribution by Make**: Bar chart showing manufacturer popularity
- **Range Distribution**: Electric range analysis and trends
- **County Distribution**: Geographic spread of EV registrations
- **Year-over-Year Trends**: EV adoption growth patterns

### 🔍 Data Exploration
- **Searchable Data Table**: Filter and search through vehicle registrations
- **Real-time Filtering**: Dynamic search across make, model, location, and year
- **Detailed Records**: Complete vehicle information display

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Theme**: Built-in theme support
- **Loading States**: Smooth loading animations
- **Interactive Elements**: Hover effects and tooltips

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI Components & Styling
- **shadcn/ui** - Modern component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Data Processing & Visualization
- **PapaParse** - CSV parsing library
- **Recharts** - React charting library
- **Custom Analytics** - Data aggregation utilities

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ev-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── card.tsx          # Card component
│   │   ├── table.tsx         # Table components
│   │   ├── badge.tsx         # Badge component
│   │   └── input.tsx         # Input component
│   ├── dashboard/            # Dashboard-specific components
│   │   ├── MetricCard.tsx    # Key metrics display
│   │   ├── EVMakeChart.tsx   # Manufacturer distribution
│   │   ├── RangeDistributionChart.tsx
│   │   ├── CountyDistributionChart.tsx
│   │   ├── YearTrendChart.tsx
│   │   └── VehicleDataTable.tsx
│   └── EvDashboard.tsx       # Main dashboard component
├── data/
│   ├── evData.ts             # Data types and utilities
│   └── Electric_Vehicle_Population_Data.csv
├── lib/
│   └── utils.ts              # Utility functions (cn, etc.)
├── App.tsx                   # Root component
└── main.tsx                  # Application entry point
```

## 📊 Data Source

The dashboard uses the **Washington State Electric Vehicle Population Data** sourced from Kaggle. The dataset includes:

- **50,000+ vehicle records**
- **Geographic data**: County and city information
- **Vehicle specifications**: Make, model, year, range
- **Registration details**: Eligibility status, utility providers
- **Economic data**: Base MSRP, legislative districts

### Data Fields
- VIN (Vehicle Identification Number)
- County and City
- Model Year, Make, Model
- Electric Vehicle Type (BEV/PHEV)
- Electric Range
- CAFV Eligibility Status
- Base MSRP
- Electric Utility Provider

## ⚡ Performance Considerations

### Current Implementation
- **CSV Size**: ~12MB (50,000+ records)
- **Loading Strategy**: Client-side CSV parsing
- **Memory Usage**: All data loaded into browser memory

### Optimizations Implemented
- **Lazy Loading**: Data loaded on component mount
- **Data Limiting**: Table shows only 10 filtered records
- **Aggregation**: Charts use pre-processed data
- **Loading States**: User feedback during data processing

### Future Improvements
- **Pagination**: Server-side data pagination
- **Virtual Scrolling**: Efficient large dataset rendering
- **Data Compression**: Optimized data formats
- **Progressive Loading**: Load data in chunks

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Code Quality
- **ESLint**: Configured with TypeScript and React rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (via ESLint)

### TypeScript Configuration
- **Path Aliases**: `@/` mapped to `./src`
- **Strict Mode**: Full TypeScript strict checking
- **ES Modules**: Modern module resolution

## 🎯 Key Components

### EVDashboard (Main Component)
- Orchestrates data loading and state management
- Renders all dashboard sections
- Handles loading states and error boundaries

### Data Processing Pipeline
1. **CSV Import**: Raw data loaded as module
2. **PapaParse Processing**: CSV to JSON conversion
3. **Data Transformation**: Field mapping and cleaning
4. **Analytics**: Aggregation and metric calculation
5. **Visualization**: Chart and table rendering

### UI Components
- **MetricCard**: Key performance indicators
- **DataTable**: Searchable vehicle records
- **Charts**: Recharts-based visualizations
- **LoadingSpinner**: User feedback during processing

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run linting**
   ```bash
   npm run lint
   ```
5. **Test your changes**
6. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
7. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**


## 🙏 Acknowledgments

- **Kaggle** for providing the Washington State EV population dataset
- **shadcn/ui** for the beautiful component library
- **Recharts** for the charting capabilities
- **PapaParse** for reliable CSV processing

## 📞 Support

If you have any questions or need help with the dashboard:

- **Issues**: Open a GitHub issue
- **Discussions**: Start a discussion thread
- **Documentation**: Check the component comments and TypeScript types

---

**Built with ❤️ using React, TypeScript, and modern web technologies**