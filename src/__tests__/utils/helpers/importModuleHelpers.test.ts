import * as assert from 'assert';
import * as fs from 'fs';
import { before, describe, it } from 'mocha';
import * as path from 'path';
import { getImportModuleList, groupImports } from '../../../utils/helpers/importModuleHelpers';
import { ImportModule } from '../../../utils/instances/ImportModule';

describe('importModuleHelpers tests', () => {
	let data: string;

	before(() => {
		data = fs.readFileSync(path.resolve(__dirname, '../../mocks/correctImportsMock.txt'), 'utf-8');
	});

	describe('getImportModuleList', () => {
		it('should return 1 import', () => {
			const imports = getImportModuleList('import lodash from \'lodash\';');

			assert.strictEqual(imports.length, 1);
			assert.strictEqual(imports.every(item => item instanceof ImportModule), true);
			assert.strictEqual(imports[0].line, 'import lodash from \'lodash\';');
			assert.strictEqual(imports[0].module, 'lodash');
			assert.strictEqual(imports[0].path, 'lodash');
		});

		it('should return 5 imports', () => {
			const imports = getImportModuleList(data);

			assert.strictEqual(imports.length, 5);
			assert.strictEqual(imports.every(item => item instanceof ImportModule), true);
			assert.strictEqual(imports[0].line, 'import enzyme from \'enzyme\';');
			assert.strictEqual(imports[0].module, 'enzyme');
			assert.strictEqual(imports[0].path, 'enzyme');
		});
	});

	describe('groupImports', () => {
		it('should group the imports based on a group config', () => {
			const importModuleList = getImportModuleList('import { styles } from \'@frontend/styles\';\nimport Home from \'@frontend/Home\';\nimport { databaseUrl } from \'@backend/constants\';\nimport { getDatabaseConnection } from \'@backend/helpers\';');
			const groupedImports = groupImports([['@frontend'], ['@backend']], importModuleList);

			assert.strictEqual(groupedImports.length, 2);
			assert.strictEqual(groupedImports[0].length, 2);
			assert.strictEqual(groupedImports[1].length, 2);
			assert.strictEqual(groupedImports[0].every(item => item.path.startsWith('@frontend')), true);
			assert.strictEqual(groupedImports[1].every(item => item.path.startsWith('@backend')), true);
		});
	});
});