import { useMemo, useState } from 'react';
import './App.css';

function App() {
	const [budget, setBudget] = useState(0);
	const [inputValue, setInputValue] = useState('');

	const isBudgetZero = useMemo(() => budget === 0, [budget]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isBudgetZero) {
			setBudget(parseInt(inputValue));
			setInputValue('');
		} else {
			if (inputValue === '') return;
			setBudget(budget - parseInt(inputValue));
			setInputValue('');
		}
	};

	const handleReset = () => {
		setBudget(0);
		setInputValue('');
	};
	return (
		<>
			<div className='budget'>
				{budget < 0 ? (
					<h1 className='red'>You are over budget by</h1>
				) : (
					<h1>Budget</h1>
				)}
				{isBudgetZero ? null : <h2>{`残り${budget}円`}</h2>}
				<form onSubmit={handleSubmit}>
					{budget === 0 ? (
						<input
							type='number'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
						/>
					) : null}
					{isBudgetZero ? null : (
						<input
							type='number'
							onChange={e => setInputValue(e.target.value)}
						/>
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
		</>
	);
}

export default App;
