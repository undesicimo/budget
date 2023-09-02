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
			<div className='seperator'></div>
			<div className='expense-list'>
				<h3 className='title'>Expenses</h3>
				{expense.map((item, index) => (
					<div
						className='expenses'
						key={index}>
						<p className='expense-name'>{item.name}</p>
						<p className='expense-amount'>{`${item.amount}円`}</p>
						<p>{now}</p>
					</div>
				))}
			</div>
		</>
	);
}
