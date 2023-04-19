import { createConverterByType, ConverterTypes } from "../converting";
import { getGuardProxyHandler } from "./ProxyHandler";

export const CreateGuardedObject = (sourceObject: any, converterType: ConverterTypes) => {
	const targetObject = {} as any;
	const converter = createConverterByType(converterType);
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
