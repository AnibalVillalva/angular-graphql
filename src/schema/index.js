var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "@graphql-tools/schema", "./schema.graphql", "./../resolvers", "graphql-import-node"], function (require, exports, schema_1, schema_graphql_1, resolvers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    schema_graphql_1 = __importDefault(schema_graphql_1);
    resolvers_1 = __importDefault(resolvers_1);
    const schema = (0, schema_1.makeExecutableSchema)({
        typeDefs: schema_graphql_1.default,
        resolvers: resolvers_1.default
    });
    exports.default = schema;
});
