type P = {
	inputValue: string;
	setInputValue: (value: React.SetStateAction<string>) => void;
};

export default function Budget(props: P) {
	const { inputValue, setInputValue } = props;
	return (
		<div className='flex flex-col align-middle'>
			<h1 className='text-3xl mb-4'>予算設定してね</h1>
			<input
				className='h-12 w-full'
				type='number'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
			<button
				className='bg-indigo-700 text-2xl w-10 inline-block mt-5'
				type='submit'>
				決定
			</button>
		</div>
	);
}
