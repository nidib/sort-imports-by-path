# Import sort by absolute path

The sorting algorithm will group each item in the array and sort (alphabetically) its children that starts with the path provided.

Paths that have no match will be treated as `npm` packages and placed at the top, and also alphabetically sorted

e.g.:

`sortImportsByPath.groups`
```js
[
	['@frontend/styles', '@frontend/helpers'],
	['@backend/utils', '@backend/constants']
]
```

imports before sorting:
```js
import database from '@backend/utils';
import errorCodes from '@backend/constants';
import { colors } from '@frontend/styles';
import { pick } from 'lodash';
import { getTheme } from '@frontend/helpers';
```

imports after sorting:
```js
import { pick } from 'lodash';
import { getTheme } from '@frontend/helpers';
import { colors } from '@frontend/styles';
import errorCodes from '@backend/constants';
import database from '@backend/utils';
```

imports after sorting (without setting a custom config):
```js
import { pick } from 'lodash';
import errorCodes from '@backend/constants';
import database from '@backend/utils';
import { getTheme } from '@frontend/helpers';
import { colors } from '@frontend/styles';
```