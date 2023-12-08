import { BranchCompany } from './models/BranchCompanyInterface';
import { DeliveryPointCommissionConfig } from './models/DeliveryPointCommissionConfigInterface';

export interface CommissionContextState {
  deliveryPointCommissionConfigs: 				DeliveryPointCommissionConfig[];
	branches: 															BranchCompany[];
	selectedBranch: 												BranchCompany | null;
	deliveryPointCommissionConfigSelected: 	DeliveryPointCommissionConfig | null;
	loading:																boolean;
}

export interface CommissionConfigBranchFormData {
	id_branch_company: number;
	branch: string;
}