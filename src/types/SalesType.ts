import { ColumnDefinitionType } from './SimpleTableType';

export type CommissionsSection = 'water' | 'icebar' | 'icecube';

export type TableCommissionsProps<T, K extends keyof T> = {
	section: 	CommissionsSection;
	loading: 	boolean;
	title?: 	string;
  data: 		Array<T>;
  columns: 	Array<ColumnDefinitionType<T, K>>;
	show: 		boolean;
	setShow: 	( value: boolean, section: CommissionsSection ) => void;
}