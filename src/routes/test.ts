import jwt from 'express-jwt'
import express, { NextFunction, Request, Response }  from 'express'
import config from '../utils/config'
import { getToken } from '../utils/auth';
// import { RequestWithUser } from '../types';
const router = express.Router();


router.get('/', jwt({secret: config.SECRET, getToken: getToken, algorithms: ['HS256'] }) , async (req: Request , res: Response, _next: NextFunction) => {

    
    res.send(req.body).end()

})


export default router