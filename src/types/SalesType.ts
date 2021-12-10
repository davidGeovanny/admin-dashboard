import { ColumnDefinitionType } from './SimpleTableType';

export type CommissionsSection = 'water' | 'icebar' | 'icecube';

export type TableCommissionsProps<T, K extends keyof T, Y> = {
	section: 		 CommissionsSection;
	loading: 		 boolean;
	title?: 		 string;
  data: 			 Array<T>;
  dataExport?: Array<Y>;
  columns: 		 Array<ColumnDefinitionType<T, K>>;
	show: 			 boolean;
	setShow: 		 ( value: boolean, section: CommissionsSection ) => void;
}