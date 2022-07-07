import { UaskClient } from "./dist/client/index.js";

const client = new UaskClient("http://127.0.0.1:3005");
await client.destroy();
