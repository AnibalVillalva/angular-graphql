var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./books.json", "./people.json"], function (require, exports, books_json_1, people_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    books_json_1 = __importDefault(books_json_1);
    people_json_1 = __importDefault(people_json_1);
    const data = {
        people: people_json_1.default,
        books: books_json_1.default
    };
    exports.default = data;
});
