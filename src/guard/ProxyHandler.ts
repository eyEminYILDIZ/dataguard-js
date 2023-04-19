import { IConverter } from "../converting";

export const getGuardProxyHandler = (converter: IConverter) => {
	return {
		get(target: any, property: any): any {
			if (typeof property === 'function') return target[property];

			const value = target[property];
			return value == undefined ? undefined : converter.output(value);
		},
		set(target: any, property: any, value: any): boolean {
			const encoded = converter.input(value);
			target[property] = encoded;
			return true;
		},
		apply(target: any, thisArg: any, args: any): any {
			console.log('called apply in proxy: target=', target);
			return target(...args);
		},
	}
};