const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql/type');

const Post = require('../../models/post');
const postType = require('../types/post');

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection (fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
      projections[selection.name.value] = true;
      return projections;
    }, {});
  }

// Query type
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        post: {
            type: postType,
            args: {
                postId: {
                    name: 'postId',
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (root, {postId}, source, fieldASTs) => {
                const projections = getProjection(fieldASTs);
                const foundPost = new Promise((resolve, reject) => {
                    Post.find({ _id: postId }, projections, (err, posts) => {
                        err ? reject(err) : resolve(posts);
                    });
                });
                return foundPost;
            }
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: (root, params, source, fieldASTs) => {
                const projections = getProjection(fieldASTs);
                const foundPosts = new Promise((resolve, reject) => {
                    Post.find({}, projections, (err, posts) => {
                        err ? reject(err) : resolve(posts);
                    });
                });
                return foundPosts;
            }
        }
    }
});

module.exports = queryType;