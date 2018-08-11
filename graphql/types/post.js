const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql/type');

// Post type
const postType = new GraphQLObjectType({
    name: 'post',
    description: 'Saved post to read',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        title: {
            type: GraphQLString
        },
        link: {
            type: GraphQLString
        },
        completed: {
            type: GraphQLBoolean
        },
        created: {
            type: GraphQLString
        }
    })
});

module.exports = postType;