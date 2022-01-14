export interface PropsTopFromSales {
  endpoint:  string;
  initDate:  string;
  finalDate: string;
  params?:   { [ x: string ] : string | number };
}