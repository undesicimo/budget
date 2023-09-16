import { Expense } from '../types';

export default function DialogMain({
	id,
	expense,
	selectedRef,
}: {
	id: string;
	expense: Expense[];
	selectedRef: React.RefObject<HTMLDialogElement>;
}) {
	const selectedExpense = expense.find(item => item.id === id);

	const handleClose = () => {
		selectedRef.current?.close();
	};

	return (
		<dialog
			className='open:flex flex-col items-center justify-between h-44 w-44 open:bg-slate-600 open:opacity-[90%]'
			ref={selectedRef}>
			<div>
				<h1>{selectedExpense?.name}</h1>
			</div>
			<div>
				<p>{selectedExpense?.amount}</p>
			</div>
			<div>
				<button onClick={handleClose}>閉じる</button>
			</div>
		</dialog>
	);
}
