const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");
const fs = require("fs");
const path = require("path");

const typeDefs = fs
  .readFileSync(path.join(__dirname, "schema.graphql"))
  .toString("utf-8");

const driver = neo4j.driver(
  "neo4j+s://fa3fed40.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "n-SHRgOGwCRgfg3PTqXv8TnfpXTHXaCUZd44FK8nKVQ")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then(async (schema) => {
  // Assert indexes and constraints defined using GraphQL schema directives
  // await neoSchema.assertIndexesAndConstraints({ options: { create: true } });

  const server = new ApolloServer({
    schema,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
