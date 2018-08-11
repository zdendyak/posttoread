const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} = require('graphql/type');

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

const Post = require('../../models/post');
const postType = require('../types/post');

const createPost = {
    type: postType,
    args: {
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        link: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, params, source, fieldASTs) => {
        const projections = getProjection(fieldASTs);
        const post = new Post(params);
        const newPost = new Promise((resolve, reject) => {
            post.save(projections, (err, posts) => {
                err ? reject(err) : resolve(posts);
            });
        });
        return newPost;
    }
}

module.exports = createPost;