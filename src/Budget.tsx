import { useCallback, useContext } from 'react';
import { BudgetContext } from './budgetReducer';

type P = {
	inputValue: string;
	setInputValue: (value: React.SetStateAction<string>) => void;
	setIsBudgetSet: (value: React.SetStateAction<boolean>) => void;
};

export default function Budget(props: P) {
	const { inputValue, setInputValue, setIsBudgetSet } = props;

	const budgetDispatch = useContext(BudgetContext);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (inputValue === '') return;
			budgetDispatch({
				type: 'SET_BUDGET',
				payload: parseInt(inputValue),
			});
			setInputValue('');
			setIsBudgetSet(true);
		},
		[inputValue]
	);

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-col items-center justify-center overflow-x-hidden'>
				<div className='flex flex-col items-center'>
					<h1 className='mb-4 text-center text-xl'>予算設定してね</h1>
					<input
						className='h-10 w-full text-center focus:outline-none bg-gray'
						type='number'
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
					<div className='flex justify-center'>
						<button
							className='border-gray-600 border rounded-md mt-3 px-0.5'
							type='submit'>
							決定
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
