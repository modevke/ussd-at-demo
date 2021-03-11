import express from 'express';
import { ussdRouter } from './v1/ussd';

export default function(app: express.Application) {

    // ROUTES
    app.use('/ussd', ussdRouter);

    // HANDLE 404
    app.use((req, res) => {
        res.status(404).send({ 
            status: '001',
            description: 'Page not found',
            data: {}
         });
    });

    // HANDLE 500
    app.use((err, req, res, next) => {
       console.log("FATAL err", err.message);
       res.status(500).send({ error: 'Server error man' });
    });

}