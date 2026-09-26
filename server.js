const express = require('express');
const path = require('path');

const app = express();
const messages = [];
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/projects', (_req, res) => {
  res.json([
    { icon: '⚡', title: 'FocusFlow', tag: 'Productivity', text: 'A glassmorphism task board with live progress.', color: 'cyan' },
    { icon: '◈', title: 'Campus Connect', tag: 'Community', text: 'A place for students to share events and ideas.', color: 'violet' },
    { icon: '⌘', title: 'DSA Tracker', tag: 'Learning', text: 'Track problem-solving streaks and weak topics.', color: 'pink' }
  ]);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Please fill every field.' });
  messages.push({ name, email, message, sentAt: new Date().toISOString() });
  res.status(201).json({ message: `Thanks ${name}! Your message reached the server.` });
});

app.listen(process.env.PORT || 3000, () => console.log('Open http://localhost:3000'));
