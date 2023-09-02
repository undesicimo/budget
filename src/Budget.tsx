type P = {
	inputValue: string;
	setInputValue: (value: React.SetStateAction<string>) => void;
};

export default function Budget(props: P) {
	const { inputValue, setInputValue } = props;
	return (
		<div>
			<h1 className='title'>予算設定してね</h1>
			<input
				type='number'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
			<button
				className='setbudget'
				type='submit'>
				決定
			</button>
		</div>
	);
}
