import app from "./app";
import config from "./utils/config";
import http from "http";

const PORT = config!.PORT;
const server = http.createServer(app);

server.listen(PORT);
