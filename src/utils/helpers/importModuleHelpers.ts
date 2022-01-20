import { GroupConfig } from '../../types/types';
import { ImportModule } from '../instances/ImportModule';
import { getES6Imports } from './regexHelpers';

function _mapItemToImportModule(item: RegExpMatchArray) {
	return new ImportModule(item[0], item[1], item[2]);
}

export function getImportModuleList(selectedStrings: string): ImportModule[] {
	return Array.from(getES6Imports(selectedStrings), _mapItemToImportModule);
}

export function groupImports(groups: GroupConfig, importModuleList: ImportModule[]) {
	let notGroupedImports = [...importModuleList];

	const groupedImports = groups.map(group => {
		const filteredLines = notGroupedImports.filter(line => group.some(item => line.path.startsWith(item)));

		notGroupedImports = notGroupedImports.filter(line => !group.some(item => line.path.includes(item)));

		return filteredLines;
	});

	if (notGroupedImports.length > 0) {
		return [notGroupedImports, ...groupedImports];
	}

	return groupedImports;
}