import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import 'express-async-errors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import logex from './utils/logex';
import routes from './routes';
dotenv.config({path: __dirname + '/../.env'});

const app: express.Application = express();
app.disable('etag').disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
    contentSecurityPolicy: false,
}))

const events = [];
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        input EventInput {
            title: String!
            description: String!
            price: Float!
        }

        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date().toISOString()
            }
            events.push(event)

            return event;
        }
    },
    graphiql: true
}))

logex()
routes(app);

const port = 4080;
app.listen(port, () => console.log(`Server listening at port ${port}`));