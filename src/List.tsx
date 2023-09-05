import { useMemo } from 'react';
import { Expense } from './types';

type P = {
	expense: Expense[];
};

export default function List(props: P) {
	const { expense } = props;
	const now = useMemo(() => new Date().toISOString().slice(0, 10), [expense]);
	return (
		<>
			<div className='m-2'>
				<h3 className='underline decoration-slate-500'>Expenses</h3>
				{expense.map((item, index) => (
					<div
						className='expenses'
						key={index}>
						<p className='underline decoration-indigo-500'>{item.name}</p>
						<p className='expense-amount'>{`${item.amount}円`}</p>
						<p>{now}</p>
					</div>
				))}
			</div>
		</>
	);
}
