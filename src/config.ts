export enum Environment {
	PROD = "PROD",
	DEV = "DEV",
	LOCAL = "LOCAL",
}

export interface IEnvironmentConfig {
	path: string;
}

export type Config = {
	[key in Environment]: IEnvironmentConfig;
};

const config: Config = {
	[Environment.PROD]: {
		path: "https://swapi.dev/api",
	},
	[Environment.DEV]: {
		path: "https://dev.example.com:3000/api",
	},
	[Environment.LOCAL]: {
		path: "http://localhost:3000/api",
	},
};

export function getConfig(env: Environment): IEnvironmentConfig {
	return config[env];
}
