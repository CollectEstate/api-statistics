export interface LeadStatisticsViewModel {
  data: {
    lead: {
      url: string;
      area: number;
      price: number;
      pricePerM: number;
      floor: number;
      maxFloor: number;
      rooms: number;
      buildingTypeName: string;
      buildingYear: number;
      image: string;
      regionName: string;
      cityName: string;
    };
    statistics: {
      lastMonth: {
        region: {
          date: string;
          pricePerMCount: number;
          pricePerMMean: number;
          pricePerMStd: number;
          pricePerMMin: number;
          pricePerMMax: number;
          pricePerM5percentage: number;
          pricePerM25percentage: number;
          pricePerMMedian: number;
          pricePerM75percentage: number;
          pricePerM95percentage: number;
        };
      };
      lastYear: {
        region: {
          pricePerM: {
            avg: {
              date: string;
              value: number;
            }[];
            median: {
              date: string;
              value: number;
            }[];
          };
        };
      };
    };
  };
}
