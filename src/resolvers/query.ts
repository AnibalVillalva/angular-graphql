import { IResolvers } from "@graphql-tools/utils";
import data from "../data"
import { IBook } from "../interfaces/book-interfaces";

const queryResolvers: IResolvers = {

    Query: {
        ping: (): string => 'pong',

        books: (): Array<IBook> => {
            return data.books;
        },

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