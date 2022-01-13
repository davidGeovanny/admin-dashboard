// export interface CommissionFormData {
// 	initDate : Date | null | undefined;
// 	finalDate: Date | null | undefined;
// };

import { Commission } from "./api/Sale/GetCommissions";

export interface SalesState {
	loadingCommissions: boolean;
	waterCommissions:  	Commission[];
	icebarCommissions: 	Commission[];
	icecubeCommissions: Commission[];
}

// export interface CommissionResponse {
// 	ok:                  boolean;
// 	water_commissions: 	 Commission[];
// 	icebar_commissions:  Commission[];
// 	icecube_commissions: Commission[];
// }

// export interface Commission {
// 	employee:   string;
// 	commission: number;
// 	branch:     string;
// }

// // Top products response
// export interface TopProductsResponse {
// 	ok:           boolean;
// 	by_frequency: TopProduct[];
// 	by_money:     TopProduct[];
// }

// export interface TopProduct {
// 	frequency: 		 number;
// 	money:     		 number;
// 	product:   		 string;
// 	short_product: string;
// }

// // Top clients response

// export interface TopClientsResponse {
// 	ok:           boolean;
// 	by_frequency: TopClient[];
// 	by_money:     TopClient[];
// }

// export interface TopClient {
// 	image?:		 string;
// 	frequency: number;
// 	money:     number;
// 	client:    string;
// }

// // Top type products response

// export interface TopTypeProductsResponse {
// 	ok:           boolean;
// 	by_frequency: TopTypeProduct[];
// 	by_money:     TopTypeProduct[];
// }

// export interface TopTypeProduct {
// 	frequency:    number;
// 	money:        number;
// 	type_product: string;
// }


// export interface TopBranchesResponse {
// 	ok:       boolean;
// 	by_money: TopBranches[];
// }

// export interface TopBranches {
// 	money:  				number;
// 	branch_company: string;
// }
