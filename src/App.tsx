import { createContext, useReducer, useState } from 'react';
import { ExpenseContext, expenseReducer } from './expenseReducer';
import {
	BudgetContext,
	budgetReducer,
	BudgetLocalStorageContext,
	BUDGET_KEY,
} from './budgetReducer';
import List from './List';
import Budget from './Budget';
import Expense from './Expense';
import { FormState, FormStates } from './types';
import useLocalStorage from '@rehooks/local-storage';

export default function App() {
	const [inputValue, setInputValue] = useState('');
	const [formState, setFormState] = useState<FormState>(
		FormStates.BudgetNotSet
	);

	const [, budgetDispatch] = useReducer(budgetReducer, 0);
	const [budget] = useLocalStorage<number>(BUDGET_KEY, 0); //set 0 as default
	const [expense, expenseDispatch] = useReducer(expenseReducer, []);

	return (
		<ExpenseContext.Provider value={expenseDispatch}>
			<BudgetContext.Provider value={budgetDispatch}>
				<BudgetLocalStorageContext.Provider value={budget}>
					<div className='flex justify-center mt-[142px] mx-16'>
						{formState === FormStates.BudgetNotSet ? (
							<Budget
								inputValue={inputValue}
								setInputValue={setInputValue}
								setFormState={setFormState}
							/>
						) : (
							<div>
								<Expense
									setInputValue={setInputValue}
									inputValue={inputValue}
									setFormState={setFormState}
								/>
								<List expense={expense} />
							</div>
						)}
					</div>
				</BudgetLocalStorageContext.Provider>
			</BudgetContext.Provider>
		</ExpenseContext.Provider>
	);
}
