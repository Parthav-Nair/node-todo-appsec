const Todo = require('./models/todo');
const { body, validationResult } = require('express-validator');

module.exports = function (app) {
  // 🔹 Get all todos
  app.get('/api/todos', async (req, res) => {
    try {
      const todos = await Todo.find(); // ✅ async/await
      res.status(200).json(todos);
    } catch (err) {
      console.error('❌ Error fetching todos:', err);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  });

  // 🔹 Create a todo
  app.post(
    '/addtodo',
    // Validation middleware
    body('text')
      .trim()
      .notEmpty().withMessage('Todo text cannot be empty')
      .isLength({ max: 100 }).withMessage('Too long'),

    // Route logic
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        await Todo.create({ text: req.body.text });
        const todos = await Todo.find(); // return updated list
        res.status(201).json(todos);
      } catch (err) {
        console.error('❌ Error creating todo:', err);
        res.status(500).json({ error: 'Failed to create todo' });
      }
    }
  );

  // 🔹 Delete a todo by ID
  app.delete('/api/todos/:todo_id', async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.todo_id);
      const todos = await Todo.find(); // return updated list
      res.status(200).json(todos);
    } catch (err) {
      console.error('❌ Error deleting todo:', err);
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  });

  // 🔹 Fallback route (Single Page App support)
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html'); // Adjusted relative path
  });
};
