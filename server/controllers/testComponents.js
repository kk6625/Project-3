const Test = require('../models/test');

// Create a new test
exports.createTest = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const newTest = new Test({
      title,
      questions,
      createdBy: req.user._id
    });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test' });
  }
};

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tests' });
  }
};