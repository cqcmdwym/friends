import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
    toGlobalId
} from 'graphql-relay';

import {
    User,
    Friend,
    getFriend,
    getFriends,
    getUser,
    getViewer
} from './database'

const GraphQLUser = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: globalIdField('User'),
        friends: {
            type: friendConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromArray(getFriends(), args)
        }
    })
});