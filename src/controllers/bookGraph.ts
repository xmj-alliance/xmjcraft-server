import * as book from "../models/book.gql";

import { makeExecutableSchema } from "apollo-server-koa";

export default class BookGraph {

  typeDefs = book;

  books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];

  resolvers = {
    Query: {
      books: () => this.books,
    },
  };

  schema = makeExecutableSchema({typeDefs: this.typeDefs, resolvers: this.resolvers})

}
