export function StyledInput<
	T extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>
>(props: T) {
	return (
		<input
			className='w-full h-[2.812rem] text-center focus:outline-none bg-white border-[0.608px] border-black rounded-[0.56981rem] text-black'
			{...props}
		/>
	);
}
