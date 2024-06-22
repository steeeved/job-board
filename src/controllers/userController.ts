import { Request, Response } from 'express';
import User from '../models/userModel';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await User.get(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving user for userId: ${userId}` });
  }
};