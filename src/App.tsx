import { useReducer, useState } from 'react';
import { ExpenseContext, expenseReducer } from './expenseReducer';
import { BudgetContext, budgetReducer } from './budgetReducer';
import List from './List';
import Budget from './Budget';
import Expense from './Expense';
import { FormState, FormStates } from './types';

export default function App() {
	const [inputValue, setInputValue] = useState('');
	const [formState, setFormState] = useState<FormState>(
		FormStates.BudgetNotSet
	);

	const [budget, budgetDispatch] = useReducer(budgetReducer, 0);
	const [expense, expenseDispatch] = useReducer(expenseReducer, []);

	return (
		<ExpenseContext.Provider value={expenseDispatch}>
			<BudgetContext.Provider value={budgetDispatch}>
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
								budget={budget}
								setInputValue={setInputValue}
								inputValue={inputValue}
								setFormState={setFormState}
							/>
							<List expense={expense} />
						</div>
					)}
				</div>
			</BudgetContext.Provider>
		</ExpenseContext.Provider>
	);
}
