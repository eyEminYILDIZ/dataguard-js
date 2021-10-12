import { CreateGuardedObject, ConverterTypes } from "../index"

test('Guard Stringfy', () => {

	const apiResponse = {
		displayName: 'John',
		role: 'Admin',
		jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.DjwRE2jZhren2Wt37t5hlVru6Myq4AhpGLiiefF69u8',
	};

	const guardedbject = CreateGuardedObject(apiResponse, ConverterTypes.Base64);

	console.log(guardedbject.displayName);
	console.log(guardedbject);
});
