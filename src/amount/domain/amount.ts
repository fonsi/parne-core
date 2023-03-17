enum Period { hour, week, month }

export interface Amount {
  qty: number;
  initDate: number;
}

export interface PeriodicAmount extends Amount {
  period: Period;
  periodicity: number;
  endDate?: number;
}
