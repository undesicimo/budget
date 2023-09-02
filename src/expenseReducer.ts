import { Expense } from './types';

type EXPENSE_ACTIONS =
	| { type: 'ADD_EXPENSE'; payload: Expense }
	| { type: 'RESET' };

export function expenseReducer(expense: Expense[], action: EXPENSE_ACTIONS) {
	switch (action.type) {
		case 'ADD_EXPENSE': {
			return [...expense, action.payload];
		}
		case 'RESET': {
			return [];
		}
		default: {
			throw new Error('Unexpected action');
		}
	}
}
