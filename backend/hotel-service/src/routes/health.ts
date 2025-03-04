import { Router, Request, Response } from 'express';

const healthRouter = Router();
let isReady = false;
let isAlive = true;

healthRouter.get('/startup', (req: Request, res: Response) => {
    res.status(200).send('Started');
});

healthRouter.get('/readiness', (req: Request, res: Response) => {
    if (isReady) {
        res.status(200).send('Ready');
    } else {
        res.status(503).send('Not Ready');
    }
});

healthRouter.get('/liveness', (req: Request, res: Response) => {
    if (isAlive) {
        res.status(200).send('Alive');
    } else {
        res.status(500).send('Service Unhealthy');
    }
});

// Simulera att tjänsten blir redo efter 10 sekunder
setTimeout(() => isReady = true, 10000);
setTimeout(() => isAlive = false, 30000);
export default healthRouter;
