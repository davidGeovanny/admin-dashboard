import { DashboardState } from '../interfaces/DashboardInterface';

type DashboardAction = 
	| { type: '' }

export const DashboardReducer =  ( state: DashboardState, action: DashboardAction ): DashboardState => {
	switch ( action.type ) {
	
		default:
			return state;
	}
}