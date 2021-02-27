import { Environment, getConfig } from "./config";
import fetch from "node-fetch";

const { path } = getConfig(
	(process.env["ENV"] as Environment) || Environment.PROD
);

describe("Planets API", () => {
	it("should return schema when including schema in the path", async () => {
		const result = await fetch(`${path}/planets/schema`);
		const data = await result.json();

		expect(data).toEqual(
			expect.objectContaining({
				$schema: expect.any(String),
			})
		);
	});
});
