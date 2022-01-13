import { RangePeriod } from '../types/DashboardType';
import { TopBranch, TopClient, TopProduct, TopTypeProduct } from './models/SaleInterface';

export interface DashboardState {
	period:              RangePeriod;
  initDate:            Date;
  finalDate:           Date;
  productsTopFrequent: TopProduct[];
  productsTopIncome:   TopProduct[];
  clientsTopIncome:    TopClient[];
  branchesRevenue:     TopBranch[];
  typeProductRevenue:  TopTypeProduct[];
  loading:             boolean;
}

export interface PropsTopFromSales {
  endpoint:  string;
  initDate:  string;
  finalDate: string;
  params?:   { [ x: string ] : string | number };
}

export interface DashboardFormData {
	initDate : Date | null;
	finalDate: Date | null;
  period:    RangePeriod;
};