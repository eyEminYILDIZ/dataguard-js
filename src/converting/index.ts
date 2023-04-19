export * from "./enums"
export * from "./interfaces"
export * from "./converters"

import { Base64Converter } from "./converters";
import { ConverterTypes } from "./enums";

export const createConverterByType = (converterType: ConverterTypes) => {
	switch (converterType) {
		case ConverterTypes.Base64:
			return new Base64Converter();

		default:
			throw new Error(`Not Handled ConverterTypes Option: ${converterType}`)

	}
}