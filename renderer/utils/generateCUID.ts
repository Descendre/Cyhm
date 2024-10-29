import { nanoid } from 'nanoid';

export const generateCUID = (): string => {
	return nanoid();
};
