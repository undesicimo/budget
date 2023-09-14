import { deleteFromStorage, writeStorage } from '@rehooks/local-storage';
import { Dispatch, createContext } from 'react';

export const BUDGET_KEY = 'budget';

export const BudgetContext = createContext<Dispatch<BUDGET_ACTIONS>>(() => {});
export const BudgetLocalStorageContext = createContext<number>(0);
type BUDGET_ACTIONS =
	| { type: 'SET_BUDGET'; payload: number }
	| { type: 'ADD_EXPENSE'; payload: number }
	| { type: 'DELETE_EXPENSE'; payload: number }
	| { type: 'RESET' };

export function budgetReducer(expense: number, action: BUDGET_ACTIONS) {
	switch (action.type) {
		case 'SET_BUDGET': {
			writeStorage(BUDGET_KEY, action.payload);
			return action.payload;
		}
		case 'ADD_EXPENSE': {
			const newExpense = expense - action.payload;
			writeStorage(BUDGET_KEY, newExpense);
			return newExpense;
		}
		case 'DELETE_EXPENSE': {
			const newExpense = expense + action.payload;
			writeStorage(BUDGET_KEY, newExpense);
			return newExpense;
		}
		case 'RESET': {
			deleteFromStorage(BUDGET_KEY);
			return 0;
		}
		default: {
			throw new Error('Unexpected action');
		}
	}
}
