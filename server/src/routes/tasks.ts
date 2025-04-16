import { Router } from 'express';
import Task from '../models/Task';

const router = Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description, status } = req.body;
  const newTask = new Task({ title, description, status });
  await newTask.save();
  res.status(201).json(newTask);
});

export default router;