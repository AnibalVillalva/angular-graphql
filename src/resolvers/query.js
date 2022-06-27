var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../data"], function (require, exports, data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    data_1 = __importDefault(data_1);
    const resolvers = {
        Query: {
            ping: () => 'pong',
            books: () => {
                return data_1.default.books;
            },
            hello: (_, args, context, info) => {
                console.log(info);
                return `Hello ${args.name}`;
            },
        }
    };
    exports.default = resolvers;
});
