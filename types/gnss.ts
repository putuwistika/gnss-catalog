// types/gnss.ts
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