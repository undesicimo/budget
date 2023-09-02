import { useCallback, useMemo, useReducer, useState } from 'react';
import './App.css';
import { expenseReducer } from './expenseReducer';
import { budgetReducer } from './budgetReducer';
import List from './List';
import Budget from './Budget';
import ExpenseInput from './Expense';

export default function App() {
	const [inputValue, setInputValue] = useState('');
	const [name, setName] = useState('');

	const [budget, budgetDispatch] = useReducer(budgetReducer, 0);
	const [expense, expenseDispatch] = useReducer(expenseReducer, []);

	const isBudgetZero = useMemo(() => budget === 0, [budget]);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (isBudgetZero) {
				if (inputValue === '') return;
				budgetDispatch({
					type: 'SET_BUDGET',
					payload: parseInt(inputValue),
				});
				setInputValue('');
			} else {
				handleSetExpense(e);
			}
		},
		[expense, inputValue, isBudgetZero, name]
	);

	const handleSetExpense = (e: React.FormEvent<HTMLFormElement>) => {
		if (inputValue === '') return;
		console.log(name, inputValue);
		budgetDispatch({
			type: 'ADD_EXPENSE',
			payload: parseInt(inputValue),
		});
		expenseDispatch({
			type: 'ADD_EXPENSE',
			payload: { name, amount: inputValue },
		});
		e.currentTarget.reset();
	};

	const handleReset = () => {
		budgetDispatch({
			type: 'RESET',
		});
		setInputValue('');
		setName('');
		expenseDispatch({
			type: 'RESET',
		});
	};

	return (
		<>
			<div className='app'>
				<div className='budget'>
					<form onSubmit={handleSubmit}>
						{isBudgetZero ? (
							<Budget
								inputValue={inputValue}
								setInputValue={setInputValue}
							/>
						) : (
							<>
								<ExpenseInput
									budget={budget}
									handleReset={handleReset}
									setInputValue={setInputValue}
									setName={setName}
								/>
								<List expense={expense} />
							</>
						)}
					</form>
				</div>
			</div>
		</>
	);
}
