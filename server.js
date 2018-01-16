import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema'

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL & Relay modern is cool!!!!')
});

const root = {
    friend: (args) => {
        return {
            "id": 2814343,
            "firstName": "Cookie",
            "lastName": "Chen",
            "gender": "Female",
            "language": "English",
            "email": "cqcmdwym@126.com",
            "IDTyped":args.id
        }
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(8080, () => console.log('Running server on localhost:8080/graphql'));