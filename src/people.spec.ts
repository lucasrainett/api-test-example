import { Environment, getConfig } from "./config";
import fetch from "node-fetch";

const { path } = getConfig(
	(process.env["ENV"] as Environment) || Environment.PROD
);

function expectToBePerson(person: any) {
	expect(person).toEqual(
		expect.objectContaining({
			name: expect.any(String),
			height: expect.any(String),
			mass: expect.any(String),
			hair_color: expect.any(String),
			skin_color: expect.any(String),
			eye_color: expect.any(String),
			birth_year: expect.any(String),
			gender: expect.any(String),
			homeworld: expect.any(String),
			films: expect.any(Array),
			species: expect.any(Array),
			vehicles: expect.any(Array),
			starships: expect.any(Array),
			created: expect.any(String),
			edited: expect.any(String),
			url: expect.any(String),
		})
	);
}

describe("People API", () => {
	it("should return schema when including schema in the path", async () => {
		const result = await fetch(`${path}/people/schema`);
		const data = await result.json();

		expect(data).toEqual(
			expect.objectContaining({
				$schema: expect.any(String),
			})
		);
	});

	it("should return data when no parameter is provided", async () => {
		const result = await fetch(`${path}/people/`);
		const data = await result.json();

		expect(data).toEqual(
			expect.objectContaining({
				count: expect.any(Number),
				next: expect.any(String),
				previous: null,
				results: expect.any(Array),
			})
		);

		data.results.forEach(expectToBePerson);
		expect(data.results.length).toEqual(10);
	});

	it("should return matching elements when search parameter is provided", async () => {
		const result = await fetch(`${path}/people/?search=Luke`);
		const data = await result.json();

		expect(data).toEqual(
			expect.objectContaining({
				count: expect.any(Number),
				next: null,
				previous: null,
				results: expect.any(Array),
			})
		);
		data.results.forEach(expectToBePerson);
		expect(data.results.length).toEqual(1);
	});

	it("should return empty when search parameter is provided with not matching value", async () => {
		const result = await fetch(`${path}/people/?search=ASDFGHJKL`);
		const data = await result.json();

		expect(data).toEqual(
			expect.objectContaining({
				count: expect.any(Number),
				next: null,
				previous: null,
				results: expect.any(Array),
			})
		);
		expect(data.results.length).toEqual(0);
	});

	it(" should return wookiee format when wookiee format is requested", async () => {
		// page=2 is included in the url because the returned JSON is invalid in page 1
		// previous=null is not generated correctly in wookiee language
		const result = await fetch(`${path}/people/?page=2&format=wookiee`);
		const data = await result.json();
		expect(data).toEqual(expect.anything());
	});

	it("should return single person when id is provided", async () => {
		const result = await fetch(`${path}/people/1/`);
		const data = await result.json();
		expectToBePerson(data);
	});
});
