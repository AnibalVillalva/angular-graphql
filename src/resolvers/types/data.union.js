"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesUnionResolvers = {
    Data: {
        __resolveType(_, // object (root)
        __, // context
        info) {
            let type = null;
            ['Book', 'People'].map((object) => {
                if (info.operation.name.value.search(object) > -1) {
                    type = object;
                }
            });
            return type;
        }
    }
};
exports.default = typesUnionResolvers;
