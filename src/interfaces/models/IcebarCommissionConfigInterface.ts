export interface IcebarCommissionConfig {
  id:                          number;
  min_range:                   number;
  max_range:                   number;
  cost_bar_operator:           string;
  cost_bar_assistant:          string;
  cost_bar_operator_assistant: string;
  created_at:                  Date;
  updated_at:                  Date;
}