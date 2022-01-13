export interface GetCommissionsRequest {
  initDate : Date | null | undefined;
	finalDate: Date | null | undefined;
}

export interface GetCommissionsResponse {
  ok:                  boolean;
  water_commissions:   Commission[];
  icebar_commissions:  Commission[];
  icecube_commissions: Commission[];
}

export interface Commission {
  employee:   string;
  branch:     Branch;
  commission: number;
}

enum Branch {
  CedisEscuinapa = "Cedis Escuinapa",
  Matriz = "Matriz",
}
