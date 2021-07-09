const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const { v4 } = require('uuid');
let products = [
    {
        id: v4(),
        name: "Adidas F50 13'- LeoMessi",
        stock: true,
    },
    {
        id: v4(),
        name: "Adidas EQT Elevation 97'- Kobe Bryant",
        stock: false,
    },
    {
        id: v4(),
        name: "Reebook The Answer 98' - Allen Iverson",
        stock: true,
    },
    {
        id: v4(),
        name: "PUMA KING 86' - Diego Maradona",
        stock: false,
    },
];
const typeDefs = gql`
    type Product {
        id: String
        name: String
        stock: Boolean
    }
    type Query {
        products: [Product]!
    }
    type Mutation {
        createProduct(name: String!): String
        removeProduct(id: String!): String
        updateProduct(id: String!): String
    }
`;
const resolvers = {
    Query: {
        products: () => products,
    },
    Mutation: {
        createProduct: (parent, args, context, info) => {
            return products.push({
                id: v4(),
                name: args.name,
                stock: true,
            });
        },
        removeProduct: (parent, args, context, info) => {
            for (let i in products) {
                if (products[i].id === args.id) {
                    products.splice(i, 1);
                }
            }
            return args.id;
        },
        updateProduct: (parent, args, context, info) => {
            for (let i in products) {
                if (products[i].id === args.id) {
                    products[i].stock = !products[i].stock;
                }
            }
            return args.id;
        },
    },
};
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () =>
    console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
