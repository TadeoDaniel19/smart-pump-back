import { v4 as uuidv4 } from 'uuid';
import { RequestHandler } from 'express';
import db from '../db';
import { User } from '../models/users';

export const getAllUsers: RequestHandler = (req, res, next) => {
  try {
    db.read();
    res.json(db.data!.users);
  } catch (err) {
    next(err);
  }
};

export const getUserById: RequestHandler = (req, res, next) => {
  try {
    db.read();
    const user = db.data!.users.find((u) => u._id === req.params.id);
    if (!user) {
      res.status(404).json({ message: 'user not found.' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser: RequestHandler = (req, res, next) => {
  try {
    const newUser: User = {
      _id: uuidv4(),
      guid: uuidv4(),
      ...req.body,
    };
    db.read();
    db.data!.users.push(newUser);
    db.write();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser: RequestHandler = (req, res, next) => {
  try {
    db.read();
    const idx = db.data!.users.findIndex((u) => u._id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ message: 'user not found.' });
      return;
    }
    console.log('id', req.params.id);
    console.log(req.body);
    const updated = { ...db.data!.users[idx], ...req.body };
    db.data!.users[idx] = updated;
    db.write();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser: RequestHandler = (req, res, next) => {
  try {
    db.read();
    const before = db.data!.users.length;
    db.data!.users = db.data!.users.filter((u) => u._id !== req.params.id);
    if (db.data!.users.length === before) {
      res.status(404).json({ message: 'user not found.' });
      return;
    }
    db.write();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
