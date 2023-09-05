type P = {
	inputValue: string;
	setInputValue: (value: React.SetStateAction<string>) => void;
};

export default function Budget(props: P) {
	const { inputValue, setInputValue } = props;
	return (
		<div className='flex flex-col items-center'>
			<h1 className='mb-4 text-center text-xl'>予算設定してね</h1>
			<input
				className='h-10 w-full text-center focus:outline-none'
				type='number'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
			<div className='flex justify-center'>
				<button
					className='border-gray-600 border rounded-md mt-3 px-0.5'
					type='submit'>
					決定
				</button>
			</div>
		</div>
	);
}
