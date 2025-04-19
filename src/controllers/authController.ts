import { RequestHandler } from 'express';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import db from '../db';

interface LoginBody {
  email: string;
  password: string;
}

export const login: RequestHandler = (req, res, next) => {
  try {
    const { email, password } = req.body as LoginBody;
    if (!email || !password) {
      res
        .status(400)
        .json({ message: 'Email and Password are mandatory fields.' });
      return;
    }

    db.read();
    const user = db.data!.users.find((u) => u.email === email);
    if (!user || user.password !== password) {
      res.status(401).json({ message: 'wrong credentials.' });
      return;
    }

    const payload = { id: user._id, email: user.email };
    const secret: Secret = process.env.JWT_SECRET!;
    const opts: SignOptions = { expiresIn: '24Hrs' };
    const token = jwt.sign(payload, secret, opts);

    res.json({ id: user._id, token });
  } catch (err) {
    next(err);
  }
};
