type P = {
	budget: number;
	setName: (value: React.SetStateAction<string>) => void;
	setInputValue: (value: React.SetStateAction<string>) => void;
	handleReset: () => void;
};

export default function ExpenseInput(props: P) {
	const { budget, setName, setInputValue, handleReset } = props;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	return (
		<div className='text-center'>
			<h1 className='w-auto text-xl '>予算</h1>
			<h2 className='value'>{`残り${budget}円`}</h2>
			<div className='expenseInput'>
				<div className='w-auto m-3'>
					<input
						className='text-center'
						placeholder='どいうの'
						type='text'
						onChange={e => setName(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className='w-auto m-3'>
					<input
						className='text-center'
						type='number'
						placeholder='いくら'
						onChange={e => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
			<div className='flex space-x-2 justify-center'>
				<button
					className='border-gray-600 border rounded-md'
					type='submit'>
					追加
				</button>
				<button
					className='border-gray-600 border rounded-md'
					type='reset'
					onClick={handleReset}>
					リセット
				</button>
			</div>
		</div>
	);
}
