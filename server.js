import { ApolloServer, gql } from "apollo-server";
import crypto from "crypto";

console.log(crypto.randomUUID());

const users = [
	{
		id: "sdaf",
		firstName: "Jack",
		lastName: "Doe",
		email: "james@doe.com",
		password: "j1a2m3e4s",
	},
	{
		id: "dfsaggg",
		firstName: "John",
		lastName: "Smith",
		email: "john@smith.com",
		password: "123456",
	},
];

const Todos = [
  {
    title: "buy book",
    by: "sdfdsf"
  }
  {
    title: "write code",
    by: "sdfsadfdsf"
  }
  {
    title: "record video",
    by: "sdfdf3sf"
  }
]

const typeDefs = gql`
	type Query {
		users: [User]
		user(id: ID!): User
	}

	input UserInput {
		firstName: String!
		lastName: String!
		email: String!
		password: String!
	}

	type Mutation {
		createUser(userNew: UserInput!): User
	}

	type User {
		id: ID
		firstName: String
		lastName: String
		email: String
	}
`;

const resolvers = {
	Query: {
		users: () => users,
		user: (parent, { id }, context) => {
			console.log(id);
			return users.find((item) => item.id == id);
		},
	},
	Mutation: {
		createUser: (_, { userNew }) => {
			const newUser = {
				id: crypto.randomUUID(),
				...userNew,
			};
			users.push(newUser);
			return newUser;
		},
	},
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
