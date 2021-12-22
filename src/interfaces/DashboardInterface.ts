import { RangePeriod } from '../types/DashboardType';
import { 
  TopProduct, 
  TopClient, 
  TopBranches, 
  TopTypeProduct
} from './SaleInterface';

export interface DashboardState {
	period:              RangePeriod;
  initDate:            Date;
  finalDate:           Date;
  productsTopFrequent: TopProduct[];
  productsTopIncome:   TopProduct[];
  clientsTopIncome:    TopClient[];
  branchesRevenue:     TopBranches[];
  typeProductRevenue:  TopTypeProduct[];
  loading:             boolean;
}

export interface PropsSales {
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