import { IResolvers } from "@graphql-tools/utils";

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

const queryResolvers: IResolvers = {

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


export default queryResolvers