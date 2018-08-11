const {
    GraphQLSchema
} = require('graphql/type');

const queryType = require('./queries/post');
const mutationType = require('./mutation');

const postSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

module.exports = postSchema;