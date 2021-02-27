import { Environment, getConfig } from "./config";
import fetch from "node-fetch";
const { path } = getConfig(
	(process.env["ENV"] as Environment) || Environment.PROD
);

describe("Root API", () => {
	it("should return content when calling root API", async () => {
		const result = await fetch(path);
		const data = await result.json();

		expect(data).toEqual(
			expect.objectContaining({
				people: expect.stringContaining("/people/"),
				planets: expect.stringContaining("/planets/"),
				films: expect.stringContaining("/films/"),
				species: expect.stringContaining("/species/"),
				vehicles: expect.stringContaining("/vehicles/"),
				starships: expect.stringContaining("/starships/"),
			})
		);
	});
});
