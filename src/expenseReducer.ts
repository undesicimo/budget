import { Dispatch, createContext } from 'react';
import { Expense } from './types';
import { generateRandomId } from './utils';

export const ExpenseContext = createContext<Dispatch<EXPENSE_ACTIONS>>(
	() => {}
);

type EXPENSE_ACTIONS =
	| { type: 'ADD_EXPENSE'; payload: Omit<Expense, 'id'> }
	| { type: 'RESET' }
	| { type: 'DELETE_EXPENSE'; payload: Expense['id'] };

export function expenseReducer(expense: Expense[], action: EXPENSE_ACTIONS) {
	switch (action.type) {
		case 'ADD_EXPENSE': {
			return [...expense, { ...action.payload, id: generateRandomId() }];
		}
		case 'DELETE_EXPENSE': {
			return expense.filter(item => item.id !== action.payload);
		}
		case 'RESET': {
			return [];
		}
		default: {
			throw new Error('Unexpected action');
		}
	}
}
