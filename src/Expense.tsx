import { useContext, useState } from 'react';
import { BudgetContext } from './budgetReducer';
import { ExpenseContext } from './expenseReducer';
import { FormState, FormStates } from './types';
import { StyledInput } from './components';

type P = {
	budget: number;
	setInputValue: (value: React.SetStateAction<string>) => void;
	inputValue: string;
	setFormState: React.Dispatch<React.SetStateAction<FormState>>;
};

export default function Expense(props: P) {
	const { budget, setInputValue, inputValue, setFormState } = props;
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

	const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (!confirm('リセットしますか？')) {
			e.preventDefault();
			return;
		}
		budgetDispatch({
			type: 'RESET',
		});
		setInputValue('');
		setName('');
		expenseDispatch({
			type: 'RESET',
		});
		setFormState(FormStates.BudgetNotSet);
	};

	return (
		<form onSubmit={handleSetExpense}>
			<div className='text-center mx-8'>
				<div className='w-auto grid grid-col'>
					<h1 className='text-black text-m justify-self-start'>残高</h1>
					{budget > 0 ? (
						<h2 className='text-xl text-black'>{'¥' + budget}</h2>
					) : (
						<>
							<h2 className='text-red-700 text-xl'>
								{Math.abs(budget) + '円'}
							</h2>
							<h3>予算オーバー</h3>
						</>
					)}
				</div>
				<div className='w-auto grid grid-col'>
					<div className='w-auto my-4'>
						<StyledInput
							placeholder='どいうの'
							type='text'
							onChange={e => setName(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<div className='w-auto my-4'>
						<StyledInput
							type='number'
							placeholder='いくら'
							onChange={e => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
				</div>
				<div className='flex space-x-2 justify-center'>
					<button
						className='border-gray-600 border rounded-md text-black'
						type='submit'>
						追加
					</button>
					<button
						className='border-gray-600 border rounded-md text-black'
						type='reset'
						onClick={e => handleReset(e)}>
						リセット
					</button>
				</div>
			</div>
		</form>
	);
}
