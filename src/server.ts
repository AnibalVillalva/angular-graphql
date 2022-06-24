import { makeExecutableSchema } from "@graphql-tools/schema"
import { ApolloServer, gql } from "apollo-server-express";
import { Application } from "express";
import { GraphQLSchema } from "graphql";
import { Server, createServer } from 'http';
import express from 'express';
import compression from 'compression';

class GraphQLServer {

    // Properties
    private _app!: Application;
    private _httpServer!: Server;
    private readonly _DEFAULT_PORT = 3025;

    constructor() {
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

        const books = [
            {
                title: 'The Awakening',
                author: 'Kate Chopin',
            },
            {
                title: 'City of Glass',
                author: 'Paul Auster',
            },
        ];

        //Define Schema

        const typeDefs = gql`
        # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

        # This "Book" type defines the queryable fields for every book in our data source.
        type Book {
            title: String
            author: String
        }

        # The "Query" type is special: it lists all of the available queries that
        # clients can execute, along with the return type for each. In this
        # case, the "books" query returns an array of zero or more Books (defined above).
        type Query {
            ping: String!
            books: [Book]
            hello(name:String):String!
        }
    `;

        // Resolvers

        const resolvers = {
            Query: {
                ping: (): string => 'pong',

                books: () => books,

                hello: (
                    _: void,
                    args: { name: String },
                    context: any,
                    info: object
                ) => {
                    console.log(info);
                    return `Hello ${args.name}`;
                },
            }
        };


        const schema: GraphQLSchema = makeExecutableSchema({
            typeDefs,
            resolvers
        });

        const apolloServer = new ApolloServer({
            schema,
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