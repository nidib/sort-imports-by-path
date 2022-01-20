import * as assert from 'assert';
import { describe, it } from 'mocha';
import { getImportModuleList } from '../../../utils/helpers/importModuleHelpers';
import { getOrderedImportModuleList, sortByPath } from '../../../utils/helpers/sortHelpers';

describe('sortHelpers tests', () => {
	describe('sortByPath', () => {
		it('should sort alphabetically importModule list by path', () => {
			const importModuleList = getImportModuleList('import PropTypes from \'prop-types\';\nimport lodash from \'lodash\';\r\nimport React from \'react\';\r\nimport * as enzyme from \'enzyme\';');
			const sorted = sortByPath(importModuleList);

			assert.strictEqual(sorted[0].path, 'enzyme');
			assert.strictEqual(sorted[1].path, 'lodash');
			assert.strictEqual(sorted[2].path, 'prop-types');
			assert.strictEqual(sorted[3].path, 'react');
		});
	});

	describe('getOrderedImportModuleList', () => {
		it('should sort alphabetically when it has no groups', () => {
			const importModuleList = getImportModuleList('import PropTypes from \'prop-types\';\nimport lodash from \'lodash\';\r\nimport React from \'react\';\r\nimport * as enzyme from \'enzyme\';');
			const orderedImportModuleList = getOrderedImportModuleList(importModuleList, null);

			assert.strictEqual(orderedImportModuleList[0].path, 'enzyme');
			assert.strictEqual(orderedImportModuleList[1].path, 'lodash');
			assert.strictEqual(orderedImportModuleList[2].path, 'prop-types');
			assert.strictEqual(orderedImportModuleList[3].path, 'react');
		});

		it('should sort alphabetically when it has 1 group with 1 item', () => {
			const npmPackages = 'import PropTypes from \'prop-types\';\nimport lodash from \'lodash\';\r\nimport React from \'react\';\r\nimport * as enzyme from \'enzyme\';';
			const projectPackages = 'import { styles } from \'@frontend/styles\';\nimport Home from \'@frontend/Home\';';
			const importModuleList = getImportModuleList(`${npmPackages}\n${projectPackages}`);
			const orderedImportModuleList = getOrderedImportModuleList(importModuleList, [['@frontend']]);

			assert.strictEqual(orderedImportModuleList[0].path, 'enzyme');
			assert.strictEqual(orderedImportModuleList[1].path, 'lodash');
			assert.strictEqual(orderedImportModuleList[2].path, 'prop-types');
			assert.strictEqual(orderedImportModuleList[3].path, 'react');
			assert.strictEqual(orderedImportModuleList[4].path, '@frontend/Home');
			assert.strictEqual(orderedImportModuleList[5].path, '@frontend/styles');
		});

		it('should sort alphabetically when it has 1 group with 2 items', () => {
			const npmPackages = 'import PropTypes from \'prop-types\';\nimport lodash from \'lodash\';\r\nimport React from \'react\';\r\nimport * as enzyme from \'enzyme\';';
			const projectPackages = 'import { styles } from \'@frontend/styles\';\nimport Home from \'@frontend/Home\';\nimport { databaseUrl } from \'@backend/constants\';\nimport { getDatabaseConnection } from \'@backend/helpers\';';
			const importModuleList = getImportModuleList(`${npmPackages}\n${projectPackages}`);
			const orderedImportModuleList = getOrderedImportModuleList(importModuleList, [['@frontend', '@backend']]);

			assert.strictEqual(orderedImportModuleList[0].path, 'enzyme');
			assert.strictEqual(orderedImportModuleList[1].path, 'lodash');
			assert.strictEqual(orderedImportModuleList[2].path, 'prop-types');
			assert.strictEqual(orderedImportModuleList[3].path, 'react');
			assert.strictEqual(orderedImportModuleList[4].path, '@backend/constants');
			assert.strictEqual(orderedImportModuleList[5].path, '@backend/helpers');
			assert.strictEqual(orderedImportModuleList[6].path, '@frontend/Home');
			assert.strictEqual(orderedImportModuleList[7].path, '@frontend/styles');
		});

		it('should sort alphabetically its children when it has 2 groups', () => {
			const npmPackages = 'import PropTypes from \'prop-types\';\nimport lodash from \'lodash\';\r\nimport React from \'react\';\r\nimport * as enzyme from \'enzyme\';';
			const projectPackages = 'import { styles } from \'@frontend/styles\';\nimport Home from \'@frontend/Home\';\nimport { databaseUrl } from \'@backend/constants\';\nimport { getDatabaseConnection } from \'@backend/helpers\';';
			const importModuleList = getImportModuleList(`${npmPackages}\n${projectPackages}`);
			const orderedImportModuleList = getOrderedImportModuleList(importModuleList, [['@frontend'], ['@backend']]);

			assert.strictEqual(orderedImportModuleList[0].path, 'enzyme');
			assert.strictEqual(orderedImportModuleList[1].path, 'lodash');
			assert.strictEqual(orderedImportModuleList[2].path, 'prop-types');
			assert.strictEqual(orderedImportModuleList[3].path, 'react');
			assert.strictEqual(orderedImportModuleList[4].path, '@frontend/Home');
			assert.strictEqual(orderedImportModuleList[5].path, '@frontend/styles');
			assert.strictEqual(orderedImportModuleList[6].path, '@backend/constants');
			assert.strictEqual(orderedImportModuleList[7].path, '@backend/helpers');
		});
	});
});