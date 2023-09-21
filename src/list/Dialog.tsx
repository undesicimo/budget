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
			className='
			open:flex flex-col justify-center items-center overflow-hidden
			 h-48 w-[17.187rem] open:bg-[#FFFFFFDE] text-black rounded-[0.625rem] shadow-md gap-4
			px-[4.625rem] pt-[0.4375rem] pb-[0.5625rem]'
			ref={selectedRef}>
			<div className='expenseName w-full h-auto text-center overflow-visible'>
				<div
					title={selectedExpense?.name}
					className='w-40'>
					<h1 className='text-3xl truncate text-center'>
						{selectedExpense?.name}
					</h1>
				</div>
				<div>
					<p className='text-sm'>{selectedExpense?.createdAt}</p>
				</div>
			</div>
			<div>
				<p className='text-4xl'>{`￥${selectedExpense?.amount}`}</p>
			</div>
			<div>
				<button onClick={handleClose}>閉じる</button>
			</div>
		</dialog>
	);
}
