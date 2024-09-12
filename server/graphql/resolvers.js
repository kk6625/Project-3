const Test = require('../models/test');
const User = require('../models/user');

const resolvers = {
  Query: {
    getTests: async () => {
      return await Test.find().populate('createdBy');
    },
  },
  Mutation: {
    createTest: async (_, { title, questions }, context) => {
      // Ensure user is logged in
      if (!context.user) {
        throw new Error('You must be logged in to create a test');
      }

      const test = new Test({
        title,
        questions,
        createdBy: context.user.userId
      });
      await test.save();
      return test;
    }
  },
  Test: {
    createdBy: async (parent) => {
      return await User.findById(parent.createdBy);
    }
  }
};

module.exports = resolvers;