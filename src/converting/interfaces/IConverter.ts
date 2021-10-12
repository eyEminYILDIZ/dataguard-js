export interface IConverter {
	input: (value: any) => string;
	output: (value: string) => any;
}