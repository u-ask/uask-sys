import test from "tape";
import { Protocol, Request, Response } from "restana";
import sinon from "sinon";
import "./test-sandbox.js";

import { getToken, TokenVerifier } from "./tokenVerifier.js";
import { generateToken, payload } from "./test-sandbox.js";

const jwt =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZMLTNFZE9MN3BkYjNSN1hCUEM0RnF2bkhRZ3RJcERXcnZLQVlvSndySUEifQ.eyJzdWIiOiIyMzEyMWQzYy04NGRmLTQ0YWMtYjQ1OC0zZDYzYTlhMDU0OTciLCJlbWFpbCI6ImFkbWluaXN0cmF0b3JAZXhhbXBsZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZ2l2ZW5fbmFtZSI6Ikdlb2Zmcm95Iiwic3VybmFtZSI6IkJlbG1vbnQiLCJwYXRpZW50X2lkIjpudWxsLCJ0aXRsZSI6IlByLiIsInBob25lIjoiMDUxMjM0NTY3OCIsInN0dWRpZXMiOnsiUDExLTA1Ijp7InNpdGVzIjpbIjAwMSIsIjAwMiJdLCJyb2xlIjoiYWRtaW5pc3RyYXRvciJ9LCJDT1BELUJQQ08iOnsic2l0ZXMiOlsiMDAxIiwiMDAyIl0sInJvbGUiOiJhZG1pbmlzdHJhdG9yIn0sIkRlbW8tZVBSTyI6eyJzaXRlcyI6WyIwMDEiLCIwMDIiXSwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiRGVtby1lQ1JGIjp7InNpdGVzIjpbIjAwMSIsIjAwMiJdLCJyb2xlIjoiYWRtaW5pc3RyYXRvciJ9fSwibm9uY2UiOiIyMDk0NGYxNGQwNTE0MjFlOTVkNTU3MjljMDg5NmI2MyIsInNfaGFzaCI6InIyeXBib0c5RzVKMDlhLVZvdGthYmciLCJhdWQiOiJzcGlyYWwiLCJleHAiOjE2MjM4NDkzNDYsImlhdCI6MTYyMzg0NTc0NiwiaXNzIjoiaHR0cDovL3VuZGVmaW5lZDo4MDgwL29pZGMifQ.oJfuvtgtb6jSJT74nyL9Z6Z6bMHa7y3K6eg2ej8ekKzs83TpG9sfX24JlerhPzIiylvNVdN5UOhMEbBVATF9uBzwfoMBK4UuMhkOyQZvwMUhr5no-a8F8zqAEGnAoAtqs1KPP0JnKU7QLYsFpFJDBXhiBF5ArBTGpu0oaTK-jZs7AcbvYYnGDPAArUCoYaGOHn5th4R0p9sfJ323IvRAVEzj0ZJZJrcOpFHT9XewD4o2L6LvpnVeLR8vF9ak6daQ5GPiwTRIlopLdjxQbQK6ono9hULsjwLwcZQ0nx-uKkT9gMhdRQ4UhdNj2nPxEEi3A3EHWWUx9x0Q7TnjiDLN7Q";

const opaque = "Q-ANQa573BMlwJNZxn-MZWDBPyOTGlxcX0zsraG56T6";

test("Verify jwt token", async t => {
  const send = sinon.stub();
  const res = {
    send,
  } as unknown as Response<Protocol.HTTPS> & {
    locals?: Record<string, unknown>;
  };
  const token = await generateToken();
  await new TokenVerifier().verify(
    {
      headers: { authorization: `Bearer ${token}` },
      query: {},
    } as Request<Protocol.HTTPS>,
    res,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async () => {}
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { exp, ...userinfo } = res.locals?.userinfo as Record<string, unknown>;
  t.deepEqual(userinfo, payload);
  t.end();
});

test("Verify opaque token", async t => {
  const send = sinon.stub();
  const res = {
    send,
  } as unknown as Response<Protocol.HTTPS> & {
    locals?: Record<string, unknown>;
  };
  await new TokenVerifier().verify(
    {
      headers: { authorization: `Bearer ${opaque}` },
      query: {},
    } as Request<Protocol.HTTPS>,
    res,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async () => {}
  );
  t.deepEqual(res.locals?.userinfo, payload);
  t.end();
});

test("Verify short token", async t => {
  let query: Record<string, string> = {};
  const verifier = new TokenVerifier();
  await verifier.generate(
    {
      headers: { authorization: `Bearer ${jwt}` },
      query: {},
    } as Request<Protocol.HTTPS>,
    {
      send({ shortToken }: { shortToken: number }) {
        query = { shortToken: String(shortToken) };
      },
    } as Response<Protocol.HTTP2>
  );
  const send = sinon.fake();
  const on = sinon.fake();
  await verifier.verify(
    { query } as Request<Protocol.HTTP2>,
    {
      send,
      on,
    } as unknown as Response<Protocol.HTTPS>,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async () => {}
  );
  t.false(on.called);
  t.equal(send.getCall(0).args[0].code, "ERR_JWT_EXPIRED");
  t.end();
});

test("Token with jwt type", t => {
  const { value, type } = getToken({
    headers: { authorization: `Bearer ${jwt}` },
  } as Request<Protocol>);
  t.equal(value, jwt);
  t.equal(type, "jwt");
  t.end();
});

test("Token with opaque type", t => {
  const { value, type } = getToken({
    headers: { authorization: `Bearer ${opaque}` },
  } as Request<Protocol>);
  t.equal(value, opaque);
  t.equal(type, "opaque");
  t.end();
});
