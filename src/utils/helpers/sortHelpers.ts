import { GroupConfig } from '../../types/types';
import { ImportModule } from '../instances/ImportModule';
import { groupImports } from './importModuleHelpers';

export function sortByPath(importModuleList: ImportModule[]) {
	return importModuleList.sort((a,b) => a.path.localeCompare(b.path));
}

export function getOrderedImportModuleList(importModuleList: ImportModule[], groups: GroupConfig | null): ImportModule[] {
	if (groups) {
		return groupImports(groups, importModuleList).map(sortByPath).flat();
	}

	return sortByPath(importModuleList);
}