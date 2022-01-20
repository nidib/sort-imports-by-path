interface IImportModule {
	line: string,
	module: string,
	path: string
}

export class ImportModule implements IImportModule {
	line: string;
	module: string;
	path: string;

	constructor(line: string, module: string, path: string) {
		this.line = line;
		this.module = module;
		this.path = path;
	}
}