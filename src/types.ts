export type Expense = {
	name: string;
	amount: string;
	id: string;
};

export const FormStates = {
	BudgetSet: 'BudgetSet',
	BudgetNotSet: 'BudgetNotSet',
} as const;

export type FormState = (typeof FormStates)[keyof typeof FormStates];
