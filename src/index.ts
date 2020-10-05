import app from "./app";
import config from "./utils/config";
import http from "http";

const PORT = config.PORT || 3001;
const server = http.createServer(app);

server.listen(PORT);
