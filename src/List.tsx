import { useContext, useMemo } from 'react';
import { Expense } from './types';
import { ExpenseContext } from './expenseReducer';
import { BudgetContext } from './budgetReducer';

type P = {
	expense: Expense[];
};

export default function List(props: P) {
	const { expense } = props;
	const now = useMemo(() => new Date().toISOString().slice(0, 10), [expense]);

	const expenseDispatch = useContext(ExpenseContext);
	const budgetDispatch = useContext(BudgetContext);

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

	return (
		<>
			<div className='my-8 overflow-auto h-[300px]'>
				{expense.map(item => (
					<div
						className='rounded-[2.5rem] bg-zinc-200 w-[21rem] h-16 flex flex-row justify-between px-8 mb-4'
						key={item.id}>
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
			</div>
		</>
	);
}
