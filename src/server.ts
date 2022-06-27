import { ApolloServer, gql } from "apollo-server-express";
import { Application } from "express";
import { Server, createServer } from 'http';
import express from 'express';
import compression from 'compression';
import { GraphQLSchema } from 'graphql';


class GraphQLServer {

    // Properties
    private _app!: Application;
    private _httpServer!: Server;
    private readonly _DEFAULT_PORT = 3025;

    private _schema!: GraphQLSchema

    constructor(schema: GraphQLSchema) {
        if (schema=== undefined){
            throw new Error("Undefined schema GraphQL")
        }
        
        this._schema = schema;
        this.init();
    }

    init() {
        this.configExpress();
        this.configApolloServerExpress();
        this.configRoutes();
    }

    private configExpress() {
        this._app = express();
        this._app.use(compression());

        this._httpServer = createServer(this._app);
    }

    private async configApolloServerExpress() {

        const apolloServer = new ApolloServer({
            schema: this._schema,
            introspection: true
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({ app: this._app, cors: true });
    }

    private configRoutes() {
        this._app.get("/hello", (_, res) => {
            res.send("Hello");
        });

        this._app.get("/", (_, res) => {
            res.redirect("/graphql")
        });

     }

    listen(callback: (port: number) => void): void {
        this._httpServer.listen(+this._DEFAULT_PORT, () => {
            callback(+this._DEFAULT_PORT)
        })
    }

}

export default GraphQLServer;