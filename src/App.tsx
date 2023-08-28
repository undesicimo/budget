import { useMemo, useState } from 'react';
import './App.css';

function App() {
	const [budget, setBudget] = useState(0);
	const [inputValue, setInputValue] = useState('');

	const isBudgetZero = useMemo(() => budget === 0, [budget]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (isBudgetZero) {
			setBudget(parseInt(inputValue));
		} else {
			setBudget(budget - parseInt(inputValue));
		}
	}

	return (
		<>
			{budget < 0 ? (
				<h1 className='red'>You are over budget by</h1>
			) : (
				<h1>Budget</h1>
			)}
			<div className='budget'>
				<form onSubmit={handleSubmit}>
					{budget === 0 ? (
						<input
							type='number'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
						/>
					) : null}
					<h2>{`${budget}円`}</h2>
					{isBudgetZero ? null : (
						<input
							type='number'
							onChange={e => setInputValue(e.target.value)}
						/>
					)}
					<button type='submit'>
						{isBudgetZero ? 'Submit' : 'Add Expense'}
					</button>
				</form>
			</div>
		</>
	);
}

export default App;
