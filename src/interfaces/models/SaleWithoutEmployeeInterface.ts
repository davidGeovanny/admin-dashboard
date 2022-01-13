export interface SaleWithoutEmployee {
  branch_company:     BranchCompany;
  client:             string;
  delivery_point_key: number;
  delivery_point:     string;
  route_name:         string;
  sales_folio:        string;
  date:               Date;
  hour:               string;
  payment_method:     PaymentMethod;
  product:            string;
  short_product:      string;
  type_product:       TypeProduct;
  original_price:     number;
  quantity:           number;
  yield:              number;
  type_modification:  TypeModification;
  modified_price:     number;
  final_price:        number;
  bonification:       number;
}

export enum BranchCompany {
  CedisEscuinapa = 'CEDIS ESCUINAPA',
  Matriz = 'MATRIZ',
}

export enum PaymentMethod {
  CashPayment = 'cash payment',
  CreditPayment = 'credit payment',
}

export enum TypeModification {
  Discount = 'discount',
  OverPrice = 'over price',
}

export enum TypeProduct {
  AguaEmbotellada = 'AGUA EMBOTELLADA',
  Barra = 'BARRA',
  Cubo = 'CUBO',
}
