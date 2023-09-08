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
				<h3 className='underline decoration-slate-500'>Expenses</h3>
				{expense.map(item => (
					<div
						className='expenses'
						key={item.id}>
						<div className='flex flex-row justify-center'>
							<p className='underline decoration-indigo-500 mr-1'>
								{item.name}
							</p>
							<button onClick={() => handleDelete(item)}>
								<img
									className='w-[13px] h-[13px]'
									src='src/assets/deletebutton.svg'
									alt='delete'
								/>
							</button>
						</div>
						<p className='expense-amount'>{`${item.amount}円`}</p>
						<p className='mt-1 text-xs'>{now}</p>
					</div>
				))}
			</div>
		</>
	);
}
