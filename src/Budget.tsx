import { useCallback, useContext } from 'react';
import { BudgetContext } from './budgetReducer';
import { FormStates } from './types';
import { StyledInput } from './components';
import { FORMSTATE_KEY } from './App';
import { writeStorage } from '@rehooks/local-storage';

type P = {
	inputValue: string;
	setInputValue: (value: React.SetStateAction<string>) => void;
};

export default function Budget(props: P) {
	const { inputValue, setInputValue } = props;

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
			writeStorage(FORMSTATE_KEY, FormStates.BudgetSet);
		},
		[inputValue]
	);

	return (
		<div className='flex flex-col items-center justify-center overflow-x-hidden'>
			<form onSubmit={handleSubmit}>
				<div className='flex flex-col items-center gap-5'>
					<h1 className='text-center text-xl text-black'>予算設定してね</h1>
					<div className='h-[32px]'>
						<StyledInput
							id='budget'
							type='number'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
						/>
					</div>
					<div className='flex justify-center'>
						<button
							id='submit-budget'
							className='border-gray-600 border rounded-md mt-3 px-0.5 text-black'
							type='submit'>
							決定
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
