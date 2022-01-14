import { RangePeriod } from '../types/DashboardType';
import { TopBranch, TopClient, TopProduct, TopTypeProduct } from './models/SaleInterface';

export interface DashboardContextState {
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

export interface DashboardFormData {
	initDate : Date | null;
	finalDate: Date | null;
  period:    RangePeriod;
};