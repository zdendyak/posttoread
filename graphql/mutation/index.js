const {
    GraphQLObjectType,
} = require('graphql/type');

const createPost = require('./createPost');
const updatePost = require('./updatePost');
const removePost = require('./removePost');

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createPost,
        updatePost,
        removePost
    }
});

module.exports = mutationType;