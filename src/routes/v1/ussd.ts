import express from 'express';
import { UssdController } from '../../controllers/Ussd.Controller';

export const ussdRouter = express.Router();

ussdRouter.post('/callback', UssdController.callback)
ussdRouter.post('/events', UssdController.events)