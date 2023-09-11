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
		<form
			className='w-64 mx-auto flex flex-col'
			onSubmit={handleSetExpense}>
			<div className='w-auto grid grid-col'>
				<h1 className='text-black text-2xl justify-self-start'>残高</h1>
				{budget > 0 ? (
					<h2 className='text-4xl text-black'>{'¥' + budget}</h2>
				) : (
					<>
						<h2 className='text-red-700 text-xl'>{Math.abs(budget) + '円'}</h2>
						<h3>予算オーバー</h3>
					</>
				)}
			</div>
			<div className='w-60 flex flex-col justify-center'>
				<div className='w-60 my-4'>
					<StyledInput
						placeholder='どいうの'
						type='text'
						onChange={e => setName(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className='w-60 my-4'>
					<StyledInput
						type='number'
						placeholder='金額'
						onChange={e => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-y-8 justify-between '>
				<button
					className='border-gray-600 border rounded-md text-black w-28 h-8'
					type='submit'>
					追加
				</button>
				<button
					className='border-gray-600 border rounded-md text-black w-28 h-8'
					type='reset'
					onClick={e => handleReset(e)}>
					リセット
				</button>
			</div>
		</form>
	);
}
