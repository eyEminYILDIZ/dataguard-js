import { Base64Converter } from "../converting/converters/Base64Converter";
import { ConverterTypes } from "../converting/enums/ConverterTypes";
import { getGuardProxyHandler } from "./ProxyHandler";

const getConverterFromType = (converterType: ConverterTypes) => {
	switch (converterType) {
		case ConverterTypes.Base64:
			return new Base64Converter();
		default:
			console.error("Not Handled ConverterTypes Option")
			return new Base64Converter();
	}
}

export const CreateGuardedObject = (sourceObject: any, converterType: ConverterTypes) => {
	const targetObject = {} as any;
	const converter = getConverterFromType(converterType);
	const guardingProxyHandler = getGuardProxyHandler(converter);
	const guardedObject = new Proxy(targetObject, guardingProxyHandler);

	Object.keys(sourceObject).forEach((key) => {
		guardedObject[key] = sourceObject[key];
	});

	targetObject.toJSON = () => {
		const newOBject = {} as any;
		Object.keys(targetObject).forEach((key) => {
			if (typeof targetObject[key] === 'function') return;
			newOBject[key] = converter.input(targetObject[key]);
		});
		return newOBject;
	};

	return guardedObject;
};
