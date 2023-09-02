type BUDGET_ACTIONS =
	| { type: 'SET_BUDGET'; payload: number }
	| { type: 'ADD_EXPENSE'; payload: number }
	| { type: 'RESET' };

export function budgetReducer(expense: number, action: BUDGET_ACTIONS) {
	switch (action.type) {
		case 'SET_BUDGET': {
			return action.payload;
		}
		case 'ADD_EXPENSE': {
			return expense - action.payload;
		}
		case 'RESET': {
			return 0;
		}
		default: {
			throw new Error('Unexpected action');
		}
	}
}
