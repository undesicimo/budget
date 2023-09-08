import { useReducer, useState } from 'react';
import './App.css';
import { ExpenseContext, expenseReducer } from './expenseReducer';
import { BudgetContext, budgetReducer } from './budgetReducer';
import List from './List';
import Budget from './Budget';
import Expense from './Expense';

export default function App() {
	const [inputValue, setInputValue] = useState('');
	const [isBudgetSet, setIsBudgetSet] = useState(false);

	const [budget, budgetDispatch] = useReducer(budgetReducer, 0);
	const [expense, expenseDispatch] = useReducer(expenseReducer, []);

	return (
		<ExpenseContext.Provider value={expenseDispatch}>
			<BudgetContext.Provider value={budgetDispatch}>
				<div className='flex justify-center mt-40 scale-150'>
					<div className='text-center'>
						{isBudgetSet ? (
							<>
								<Expense
									budget={budget}
									setInputValue={setInputValue}
									inputValue={inputValue}
									setisBudgetSet={setIsBudgetSet}
								/>
								<List expense={expense} />
							</>
						) : (
							<Budget
								inputValue={inputValue}
								setInputValue={setInputValue}
								setIsBudgetSet={setIsBudgetSet}
							/>
						)}
					</div>
				</div>
			</BudgetContext.Provider>
		</ExpenseContext.Provider>
	);
}
