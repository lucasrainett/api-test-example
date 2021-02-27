# api test example

This is an example on how api could be tested from jest
this example uses the popular [Star Wars API](https://swapi.dev/) but the process demonstrated here should be portable to any other API.

If you plan to run this test multiple times, it is recommended to run agains the local cache server, as the Star Wars API has a "Rate limiting".
Check For Rate Limit here https://swapi.dev/documentation

Run `yarn local:server` in one terminal

And `yarn test:local` in the second terminal


