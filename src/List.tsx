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
			<div className='m-2 overflow-auto h-[300px]'>
				{expense.map(item => (
					<div
						className='rounded-[2.5rem] bg-zinc-200 w-[21rem] h-16 grid grid-flow-row justify-center items-center'
						key={item.id}>
						<div className='flex flex-row justify-center'>
							<div>
								<p className='underline decoration-indigo-500 text-black text-xl'>
									{item.name}
								</p>
								<p className='text-black text-xs'>{now}</p>
							</div>
							<div>
								<p className='text-black'>{`${item.amount}円`}</p>
							</div>
							<div>
								<button onClick={() => handleDelete(item)}>
									<img
										className='w-6 h-6'
										src='src/assets/deletebutton.svg'
										alt='delete'
									/>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
