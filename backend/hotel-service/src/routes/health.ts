import { Router, Request, Response } from 'express';

const healthRouter = Router();

let isReady = false;
let isAlive = true;
//let isStartup = false; 

//setTimeout(() => isStartup = true, 5000);
//setTimeout(() => isReady = true, 5000); // 10 000
//setTimeout(() => isAlive = false, 5000); // 30 000

healthRouter.get('/startup', (req: Request, res: Response) => {
    //if (isStartup) {
        res.status(200).send('Started');
   // } else {
      //  res.status(500).send('Not Started'); 
   // }
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
setTimeout(() => isReady = true, 5000);
//setTimeout(() => isAlive = false, 5000);
export default healthRouter;