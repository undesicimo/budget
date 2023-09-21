import { useContext, useRef, useState } from 'react';
import { Expense } from '../types';
import { ExpenseContext } from '../expenseReducer';
import { BudgetContext } from '../budgetReducer';
import DialogMain from './Dialog';

type P = {
	expense: Expense[];
};

export default function List(props: P) {
	const { expense } = props;

	const [selectedItemID, setSelectedItemID] = useState('');
	const expenseDispatch = useContext(ExpenseContext);
	const budgetDispatch = useContext(BudgetContext);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleDelete = (item: Expense) => {
		expenseDispatch({
			type: 'DELETE_EXPENSE',
			payload: item.id,
		});

		budgetDispatch({
			type: 'DELETE_EXPENSE',
			payload: parseInt(item.amount),
		});
	};

	const onExpenseClickOpenDialog = (itemId: string) => {
		const item = expense.find(item => item.id === itemId);
		if (!item) return;
		setSelectedItemID(item.id);
		dialogRef.current?.showModal();
	};

	return (
		<>
			<div className='my-8 overflow-auto h-[300px]'>
				{expense.map(item => (
					<div
						className='rounded-[2.5rem] bg-zinc-200 w-[21rem] h-16 flex flex-row justify-between px-2 mb-4'
						key={item.id}>
						<button
							className='flex flex-row gap-5'
							onClick={() => onExpenseClickOpenDialog(item.id)}>
							<div className='w-[3.125rem] h-[3.125rem] flex-shrink-0 border-slate-300 border-[1.5px] rounded-full bg-white self-center'>
								<div className='text-[1.875rem]'>{item.emoji}</div>
							</div>
							<div className='self-center w-16'>
								<p
									className='text-black truncate'
									title={item.name}>
									{item.name}
								</p>
								<p className='text-black text-[0.61rem]'>{item.createdAt}</p>
							</div>
							<div className='self-center'>
								<p className='text-black text-2xl'>{`${item.amount}円`}</p>
							</div>
						</button>
						<div className='w-[24px] h-[24px] self-center'>
							<button onClick={() => handleDelete(item)}>
								<img
									src='images/deletebutton.svg'
									alt='delete'
								/>
							</button>
						</div>
					</div>
				))}
				<DialogMain
					id={selectedItemID}
					expense={expense}
					selectedRef={dialogRef}
				/>
			</div>
		</>
	);
}
