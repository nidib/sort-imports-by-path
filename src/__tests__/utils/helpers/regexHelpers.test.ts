import * as assert from 'assert';
import { describe, it } from 'mocha';
import { getES6Imports } from '../../../utils/helpers/regexHelpers';

describe('regexHelpers tests', () => {
	describe('Multiple Operating systems', () => {
		describe('Windows line endings', () => {
			it('should return 1 import', () => {
				const imports = getES6Imports('import lodash from \'lodash\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 1);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return 2 imports', () => {
				const imports = getES6Imports('import lodash from \'lodash\';\r\nimport React from \'react\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 2);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return 3 imports', () => {
				const imports = getES6Imports('import lodash from \'lodash\';\r\nimport React from \'react\';\r\nimport * as enzyme from \'enzyme\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 3);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return all destructured imports', () => {
				const imports = getES6Imports('import { mount } from \'enzyme\';\r\nimport {\r\n\tComponent,\r\n\tuseEffect\n} from \'react\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 2);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return only imports that ends with semi-colon', () => {
				const imports = getES6Imports('import lodash from \'lodash\';\r\nimport React from \'react\';\r\nimport * as enzyme from \'enzyme\'');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 2);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
				assert.strictEqual(importsList[0][2], 'lodash');
				assert.strictEqual(importsList[1][2], 'react');
			});
		});

		describe('Old MacOS line endings', () => {
			it('should return 1 import', () => {
				const imports = getES6Imports('import lodash from \'lodash\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 1);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return 2 imports', () => {
				const imports = getES6Imports('import lodash from \'lodash\';\rimport React from \'react\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 2);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return 3 imports', () => {
				const imports = getES6Imports('import lodash from \'lodash\';\rimport React from \'react\';\rimport * as enzyme from \'enzyme\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 3);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return all destructured imports', () => {
				const imports = getES6Imports('import { mount } from \'enzyme\';\rimport {\r\tComponent,\r\tuseEffect\n} from \'react\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 2);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return only imports that ends with semi-colon', () => {
				const imports = getES6Imports('import lodash from \'lodash\';\rimport React from \'react\';\rimport * as enzyme from \'enzyme\'');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 2);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
				assert.strictEqual(importsList[0][2], 'lodash');
				assert.strictEqual(importsList[1][2], 'react');
			});
		});

		describe('Unix line ending', () => {
			it('should return 1 import', () => {
				const imports = getES6Imports('import lodash from \'lodash\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 1);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return 2 imports', () => {
				const imports = getES6Imports('import lodash from \'lodash\';\nimport React from \'react\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 2);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return 3 imports', () => {
				const imports = getES6Imports('import lodash from \'lodash\';\nimport React from \'react\';\nimport * as enzyme from \'enzyme\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 3);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return all destructured imports', () => {
				const imports = getES6Imports('import { mount } from \'enzyme\';\nimport {\n\tComponent,\n\tuseEffect\n} from \'react\';');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 2);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
			});
	
			it('should return only imports that ends with semi-colon', () => {
				const imports = getES6Imports('import lodash from \'lodash\';\nimport React from \'react\';\nimport * as enzyme from \'enzyme\'');
				const importsList = [...imports];
	
				assert.strictEqual(importsList.length, 2);
				assert.strictEqual(importsList.every(item => item.length === 3), true);
				assert.strictEqual(importsList.every(item => `import ${item[1]} from '${item[2]}';` === item[0]), true);
				assert.strictEqual(importsList[0][2], 'lodash');
				assert.strictEqual(importsList[1][2], 'react');
			});
		});
	});
});
