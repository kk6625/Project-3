const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
require('dotenv').config();

const startServer = async () => {
  // Initialize Express app
  const app = express();

  // Initialize Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Start Apollo Server
  await server.start();

  // Apply middleware to Express app
  server.applyMiddleware({ app });

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }

  // Start the Express server
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server running at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
  );
};

require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Call the startServer function to kick off the server
startServer();

