type P = {
	budget: number;
	setName: (value: React.SetStateAction<string>) => void;
	setInputValue: (value: React.SetStateAction<string>) => void;
	handleReset: () => void;
};

export default function ExpenseInput(props: P) {
	const { budget, setName, setInputValue, handleReset } = props;
	return (
		<>
			<h1 className='w-1 text-xl bg-amber-900 '>予算</h1>
			<h2 className='value'>{`残り${budget}円`}</h2>
			<div className='expenseInput'>
				<input
					className='name'
					placeholder='どいうの'
					type='text'
					onChange={e => setName(e.target.value)}
				/>
				<input
					type='number'
					placeholder='いくら'
					onChange={e => setInputValue(e.target.value)}
				/>
			</div>
			<div className='setexpense'>
				<button type='submit'>追加</button>
				<button
					type='reset'
					onClick={handleReset}>
					リセット
				</button>
			</div>
		</>
	);
}
