var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./server", "./schema"], function (require, exports, server_1, schema_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    server_1 = __importDefault(server_1);
    schema_1 = __importDefault(schema_1);
    const graphQLServer = new server_1.default(schema_1.default);
    graphQLServer.listen((port) => console.log(`http://localhost:${port}/graphql`));
});
