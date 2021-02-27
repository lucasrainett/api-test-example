import { createServer } from "http";
import fetch from "node-fetch";

// this is only a simple cache proxy as the swapi was limits on how many calls can be done.
// check https://swapi.dev/documentation rate limit

const cache: { [key: string]: string } = {};

createServer(async (request, response) => {
	const url = `https://swapi.dev${request.url}`;
	cache[url] = cache[url] || (await getRemoteData(url));
	response.statusCode = 200;
	response.setHeader("content-type", "application/json");
	response.write(cache[url]);
	response.end();
}).listen(3000);

async function getRemoteData(url: string): Promise<any> {
	console.log(`call remote: ${url}`);
	const result = await fetch(url);
	return result.text();
}
