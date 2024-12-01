// services/api.ts

// Base URL configuration
const API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
    endpoint: '/api/catalog'
  } as const;
  
  // Full API URL
  const API_URL = `${API_CONFIG.baseURL}${API_CONFIG.endpoint}`;
  
  // Interface untuk data GNSS
  export interface GNSSData {
    id: string;
    basefile: string;
    file: string;
    date: number;
    cathour: number;
    clon: number;
    clat: number;
    azim: number;
    nlev: number;
    slon: number;
    elon: number;
    slat: number;
    elat: number;
    formatted_date: string;
  }
  
  // API Functions
  export const searchByPoint = async (params: {
    lat: number;
    lon: number;
    start_date: string;
    end_date: string;
  }): Promise<GNSSData[]> => {
    const queryParams = new URLSearchParams({
      lat: params.lat.toString(),
      lon: params.lon.toString(),
      start_date: params.start_date,
      end_date: params.end_date
    });
  
    const response = await fetch(`${API_URL}/search/point?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  };
  
  export const searchByRegion = async (params: {
    start_lat: number;
    end_lat: number;
    start_lon: number;
    end_lon: number;
    start_date: string;
    end_date: string;
  }): Promise<GNSSData[]> => {
    const queryParams = new URLSearchParams({
      start_lat: params.start_lat.toString(),
      end_lat: params.end_lat.toString(),
      start_lon: params.start_lon.toString(),
      end_lon: params.end_lon.toString(),
      start_date: params.start_date,
      end_date: params.end_date
    });
  
    const response = await fetch(`${API_URL}/search/region?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  };