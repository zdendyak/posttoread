const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
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

const removePost = {
    type: postType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve: (root, params, source, fieldASTs) => {
        const projections = getProjection(fieldASTs);
        const deletedPost = new Promise((resolve, reject) => {
            Post.findByIdAndRemove(
                params.id, 
                projections, 
                (err, posts) => {
                    err ? reject(err) : resolve(posts);
                });
        });
        return deletedPost;
    }
}

module.exports = removePost;