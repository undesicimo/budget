import { useContext, useState } from 'react';
import { BudgetContext } from './budgetReducer';
import { ExpenseContext } from './expenseReducer';

type P = {
	budget: number;
	setInputValue: (value: React.SetStateAction<string>) => void;
	inputValue: string;
	setisBudgetSet: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Expense(props: P) {
	const { budget, setInputValue, inputValue, setisBudgetSet } = props;
	const [name, setName] = useState('');
	const budgetDispatch = useContext(BudgetContext);
	const expenseDispatch = useContext(ExpenseContext);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	const handleSetExpense = (e: React.FormEvent<HTMLFormElement>) => {
		if (inputValue === '' || name === '') return;
		e.preventDefault();
		budgetDispatch({
			type: 'ADD_EXPENSE',
			payload: parseInt(inputValue),
		});
		expenseDispatch({
			type: 'ADD_EXPENSE',
			payload: { name, amount: inputValue },
		});
		setInputValue('');
		setName('');
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
		setisBudgetSet(false);
	};

	return (
		<form onSubmit={handleSetExpense}>
			<div className='text-center'>
				<h1 className='w-auto text-xl '>予算</h1>
				<h2 className='value'>{`残り${budget}円`}</h2>
				<div className='expenseInput'>
					<div className='w-auto m-3'>
						<input
							className='text-center w-[80%] bg-gray focus:outline-none focus:placeholder-transparent'
							placeholder='どいうの'
							type='text'
							onChange={e => setName(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<div className='w-auto m-3'>
						<input
							className='text-center w-[80%] bg-gray focus:outline-none focus:placeholder-transparent'
							type='number'
							placeholder='いくら'
							onChange={e => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
				</div>
				<div className='flex space-x-2 justify-center'>
					<button
						className='border-gray-600 border rounded-md'
						type='submit'>
						追加
					</button>
					<button
						className='border-gray-600 border rounded-md'
						type='reset'
						onClick={handleReset}>
						リセット
					</button>
				</div>
			</div>
		</form>
	);
}
