import { Dispatch, createContext } from 'react';
import { Expense } from './types';
import { generateRandomId } from './utils';
import { deleteFromStorage, writeStorage } from '@rehooks/local-storage';
export const EXPENSE_KEY = 'expense';

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
			const newExpense = [
				...expense,
				{ ...action.payload, id: generateRandomId() },
			];
			writeStorage(EXPENSE_KEY, newExpense);

			return newExpense;
		}
		case 'DELETE_EXPENSE': {
			const filteredExpense = expense.filter(
				item => item.id !== action.payload
			);
			writeStorage(EXPENSE_KEY, filteredExpense);

			return filteredExpense;
		}
		case 'RESET': {
			deleteFromStorage(EXPENSE_KEY);
			return [];
		}
		default: {
			throw new Error('Unexpected action');
		}
	}
}
