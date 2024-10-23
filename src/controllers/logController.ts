import { Request, Response } from 'express';
import { AppDataSource } from '../database/dataSource';
import { Log } from '../entity/Log';

// Retrieve all logs
export const getLogs = async (req: Request, res: Response) => {
    try {
        const logRepo = AppDataSource.getRepository(Log);
        const logs = await logRepo.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
