import { useContext, useState } from 'react';
import { BudgetContext, BudgetLocalStorageContext } from './budgetReducer';
import { ExpenseContext } from './expenseReducer';
import { FormStates } from './types';
import { FORMSTATE_KEY } from './App';
import { writeStorage } from '@rehooks/local-storage';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from './components/ui/popover';
import EmojiPicker from 'emoji-picker-react';

type P = {
	setInputValue: (value: React.SetStateAction<string>) => void;
	inputValue: string;
};

export default function Expense(props: P) {
	const { setInputValue, inputValue } = props;
	const [name, setName] = useState('');
	const [emoji, setEmoji] = useState('');
	const budgetDispatch = useContext(BudgetContext);
	const expenseDispatch = useContext(ExpenseContext);
	const budget = useContext(BudgetLocalStorageContext);

	const handleSetExpense = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue === '' || name === '') return;

		if (budget < 0) {
			confirm('予算オーバーです。よろしいですか？');
		}

		budgetDispatch({
			type: 'ADD_EXPENSE',
			payload: parseInt(inputValue),
		});
		expenseDispatch({
			type: 'ADD_EXPENSE',
			payload: { name, amount: inputValue, emoji },
		});
		setInputValue('');
		setName('');
		setEmoji('');
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
		writeStorage(FORMSTATE_KEY, FormStates.BudgetNotSet);
	};

	return (
		<form
			className='w-[16.5625rem] mx-auto'
			onSubmit={handleSetExpense}>
			<div className='flex flex-col items-center'>
				<div className='flex flex-col'>
					<h1 className='text-black text-2xl self-center'>残高</h1>
					{budget > 0 ? (
						<h2 className='text-4xl text-black'>{'¥' + budget}</h2>
					) : (
						<>
							<h2 className='text-red-700 text-xl self-center'>
								{Math.abs(budget) + '円'}
							</h2>
							<h3 className='text-red-700 text-xl self-center'>予算オーバー</h3>
						</>
					)}
				</div>
				<div className='flex flex-col gap-8 my-8 w-full'>
					<div className='flex flex-row justify-between'>
						<div
							className='flex
							border-black border-[0.608px] rounded-[0.56981rem]
								w-[4.6875rem] h-[2.812rem]'>
							<Popover>
								<PopoverTrigger className='flex flex-col justify-center items-center	w-full h-full'>
									{emoji ? (
										<div className='text-2xl'>{emoji}</div>
									) : (
										<img src='images/mingcute-emoji-line.svg' />
									)}
								</PopoverTrigger>
								<PopoverContent>
									<div>
										<EmojiPicker
											onEmojiClick={emoji => setEmoji(emoji.emoji)}
											height={400}
											width={300}
											previewConfig={{
												defaultCaption: 'どいうやつ?',
											}}
										/>
									</div>
								</PopoverContent>
							</Popover>
						</div>
						<input
							id='name-input'
							placeholder='どういうの'
							className='w-[11.25rem] h-[2.812rem] text-center focus:outline-none
							 bg-white border-[0.608px] border-black rounded-[0.56981rem] text-black'
							type='text'
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div>
						<input
							id='amount-input'
							placeholder='金額'
							className='w-full h-[2.812rem] text-center focus:outline-none
							 bg-white border-[0.608px] border-black rounded-[0.56981rem] text-black'
							type='number'
							onChange={e => setInputValue(e.target.value)}
						/>
					</div>
				</div>
				<div className='flex flex-row gap-8 h-[2.3rem]'>
					<button
						className='border-gray-600 border rounded-[0.56981rem] text-black w-[7.06563rem] h-full'
						type='submit'>
						追加
					</button>
					<button
						id='reset-button'
						className='border-gray-600 border rounded-[0.56981rem] text-black w-[7.06563rem] h-full'
						type='reset'
						onClick={e => handleReset(e)}>
						リセット
					</button>
				</div>
			</div>
		</form>
	);
}
