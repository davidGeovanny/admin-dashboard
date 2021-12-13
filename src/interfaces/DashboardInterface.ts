import { RangePeriod } from '../types/DashboardType';
import { 
  TopProduct, 
  TopClient, 
  TopBranches, 
  TopTypeProduct
} from './SaleInterface';

export interface DashboardState {
	period:              RangePeriod;
  initDate:            string;
  finalDate:           string;
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
	initDate : Date | null | undefined;
	finalDate: Date | null | undefined;
};