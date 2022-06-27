var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "apollo-server-express", "http", "express", "compression"], function (require, exports, apollo_server_express_1, http_1, express_1, compression_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    express_1 = __importDefault(express_1);
    compression_1 = __importDefault(compression_1);
    class GraphQLServer {
        constructor(schema) {
            this._DEFAULT_PORT = 3025;
            if (schema === undefined) {
                throw new Error("Undefined schema GraphQL");
            }
            this._schema = schema;
            this.init();
        }
        init() {
            this.configExpress();
            this.configApolloServerExpress();
            this.configRoutes();
        }
        configExpress() {
            this._app = (0, express_1.default)();
            this._app.use((0, compression_1.default)());
            this._httpServer = (0, http_1.createServer)(this._app);
        }
        async configApolloServerExpress() {
            const apolloServer = new apollo_server_express_1.ApolloServer({
                schema: this._schema,
                introspection: true
            });
            await apolloServer.start();
            apolloServer.applyMiddleware({ app: this._app, cors: true });
        }
        configRoutes() {
            this._app.get("/hello", (_, res) => {
                res.send("Hello");
            });
            this._app.get("/", (_, res) => {
                res.redirect("/graphql");
            });
        }
        listen(callback) {
            this._httpServer.listen(+this._DEFAULT_PORT, () => {
                callback(+this._DEFAULT_PORT);
            });
        }
    }
    exports.default = GraphQLServer;
});
