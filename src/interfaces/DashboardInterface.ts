import { RangePeriod } from '../types/DashboardType';
import { 
  TopProduct, 
  TopClient, 
  TopBranches, 
  TopTypeProduct
} from './SaleInterface';

export interface DashboardState {
	period:              RangePeriod;
  productsTopFrequent: TopProduct[];
  productsTopIncome:   TopProduct[];
  clientsTopIncome:    TopClient[];
  branchesRevenue:     TopBranches[];
  typeProductRevenue:  TopTypeProduct[];
  loading:             boolean;
}