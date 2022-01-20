import { importRegex } from '../constants/regexConstants';

export function getES6Imports(text: string): IterableIterator<RegExpMatchArray> {
	return text.matchAll(importRegex);
}