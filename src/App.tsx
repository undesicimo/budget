import { useCallback, useMemo, useReducer, useState } from 'react';
import './App.css';
import { expenseReducer } from './expenseReducer';
import { budgetReducer } from './budgetReducer';
import List from './List';

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
					{isBudgetZero ? (
						<h1 className='title'>予算設定してね</h1>
					) : (
						<h1 className='setexpense-title'>予算</h1>
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
							<div className='expenseInput'>
								<input
									className='name'
									placeholder='どいう'
									type='text'
									onChange={e => setName(e.target.value)}
								/>
								<input
									type='number'
									placeholder='いくら'
									onChange={e => setInputValue(e.target.value)}
								/>
							</div>
						)}
						<div className='submit'>
							{isBudgetZero ? (
								<button
									className='setbudget'
									type='submit'>
									決定
								</button>
							) : (
								<div className='setexpense'>
									<button type='submit'>追加</button>
									<button
										type='reset'
										onClick={handleReset}>
										リセット
									</button>
								</div>
							)}
						</div>
					</form>
				</div>
				{isBudgetZero ? null : <List expense={expense} />}
			</div>
		</>
	);
}
