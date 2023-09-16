import { useContext, useMemo, useRef, useState } from 'react';
import { Expense } from './types';
import { ExpenseContext } from './expenseReducer';
import { BudgetContext } from './budgetReducer';

type P = {
	expense: Expense[];
};

export default function List(props: P) {
	const { expense } = props;
	const now = useMemo(() => new Date().toISOString().slice(0, 10), [expense]);

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

	const DialogMain = ({ id }: { id: string }) => {
		const selectedExpense = expense.find(item => item.id === id);

		const handleClose = () => {
			dialogRef.current?.close();
		};

		return (
			<div className=''>
				<h1>{selectedExpense?.name}</h1>
				<p>{selectedExpense?.amount}</p>
				<button onClick={handleClose}>閉じる</button>
			</div>
		);
	};

	return (
		<>
			<div className='my-8 overflow-auto h-[300px]'>
				{expense.map(item => (
					<div
						className='rounded-[2.5rem] bg-zinc-200 w-[21rem] h-16 flex flex-row justify-between px-8 mb-4'
						key={item.id}>
						<button
							className='flex flex-row gap-8'
							onClick={() => onExpenseClickOpenDialog(item.id)}>
							<div className='self-center w-16'>
								<p
									className='text-black truncate'
									title={item.name}>
									{item.name}
								</p>
								<p className='text-black text-[0.61rem]'>{now}</p>
							</div>
							<div className='self-center'>
								<p className='text-black text-2xl'>{`${item.amount}円`}</p>
							</div>
						</button>
						<div className='w-[24px] h-[24px] self-center'>
							<button onClick={() => handleDelete(item)}>
								<img
									src='src/assets/deletebutton.svg'
									alt='delete'
								/>
							</button>
						</div>
					</div>
				))}
				<dialog ref={dialogRef}>
					<DialogMain id={selectedItemID} />
				</dialog>
			</div>
		</>
	);
}
