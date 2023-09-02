import { useCallback, useMemo, useReducer, useState } from 'react';
import './App.css';

type Expense = {
	name: string;
	amount: string;
};

type BUDGET_ACTIONS =
	| { type: 'SET_BUDGET'; payload: number }
	| { type: 'ADD_EXPENSE'; payload: number }
	| { type: 'RESET' };

function budgetReducer(expense: number, action: BUDGET_ACTIONS) {
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

type EXPENSE_ACTIONS =
	| { type: 'ADD_EXPENSE'; payload: Expense }
	| { type: 'RESET' };

function expenseReducer(expense: Expense[], action: EXPENSE_ACTIONS) {
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

function App() {
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
			<div className='budget'>
				{budget < 0 ? (
					<h1 className='red'>You are over budget by</h1>
				) : (
					<h1 className='title'>Budget</h1>
				)}
				{isBudgetZero ? null : <h2 className='value'>{`残り${budget}円`}</h2>}
				<form onSubmit={handleSubmit}>
					{budget === 0 ? (
						<input
							type='number'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
						/>
					) : null}
					{isBudgetZero ? null : (
						<div>
							<input
								type='text'
								onChange={e => setName(e.target.value)}
							/>
							<input
								type='number'
								onChange={e => setInputValue(e.target.value)}
							/>
						</div>
					)}
					<div className='submit'>
						{isBudgetZero ? (
							<button type='submit'>Set Budget</button>
						) : (
							<button type='submit'>Submit</button>
						)}
						{isBudgetZero ? null : (
							<button
								type='reset'
								onClick={handleReset}>
								Reset
							</button>
						)}
					</div>
				</form>
			</div>
			<div className='expense'>
				<h3 className='title'>Expenses</h3>
				{expense.map((item, index) => (
					<div key={index}>
						<p>{item.name}</p>
						<p>{item.amount}</p>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
