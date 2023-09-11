import { useCallback, useContext } from 'react';
import { BudgetContext } from './budgetReducer';
import { FormState, FormStates } from './types';
import { StyledInput } from './components';

type P = {
	inputValue: string;
	setInputValue: (value: React.SetStateAction<string>) => void;
	setFormState: React.Dispatch<React.SetStateAction<FormState>>;
};

export default function Budget(props: P) {
	const { inputValue, setInputValue, setFormState } = props;

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
			setFormState(FormStates.BudgetSet);
		},
		[inputValue]
	);

	return (
		<div className='flex flex-col items-center justify-center overflow-x-hidden'>
			<form onSubmit={handleSubmit}>
				<div className='flex flex-col items-center'>
					<h1 className='mb-4 text-center text-xl text-black'>
						予算設定してね
					</h1>
					<div className='h-[32px]'>
						<StyledInput
							type='number'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
						/>
					</div>
					<div className='flex justify-center'>
						<button
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
