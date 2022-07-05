import test from "../client/test-runner.js";

test("Server get request", async (client, t) => {
  const response = await client.get('graphql?query={survey(name:"P11-05")}');
  t.equal(response.statusCode, 200);
  t.true(response.headers["access-control-allow-headers"]);
  t.true(response.headers["access-control-allow-origin"]);
  t.end();
});

test("Server option CORS", async (client, t) => {
  const response = await client("graphql", { method: "OPTIONS" });
  t.equal(response.statusCode, 200);
  t.true(response.headers["access-control-allow-methods"]);
  t.end();
});
