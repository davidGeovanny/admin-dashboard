export interface TopBranch {
  frequency:      number;
  money:          number;
  branch_company: string;
}

export interface TopClient {
  image?:		 string;
  frequency: number;
  money:     number;
  client:    string;
}

export interface TopProduct {
  frequency:     number;
  money:         number;
  short_product: string;
  product:       string;
}

export interface TopTypeProduct {
  frequency:    number;
  money:        number;
  type_product: string;
}