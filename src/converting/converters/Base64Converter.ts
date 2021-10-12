import { IConverter } from "../interfaces/IConverter";

export class Base64Converter implements IConverter {
	input = (value: any) => {
		return window.btoa(value);
	};
	output = (value: any) => {
		if (typeof value === 'function') return value;

		return window.atob(value);
	};
}
