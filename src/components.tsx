export function StyledInput<
	T extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>
>(props: T) {
	return (
		<input
			className='h-full w-60 text-center focus:outline-none bg-white 
			text-black rounded-[9.117px] border-[0.608px] border-black'
			{...props}
		/>
	);
}
