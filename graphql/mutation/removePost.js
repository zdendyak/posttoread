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
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, params, source, fieldASTs) => {
        const projections = getProjection(fieldASTs);
        const deletedPost = new Promise((resolve, reject) => {
            return Post.findByIdAndRemove(
                params.id, 
                projections, 
                (err, posts) => {
                    return err ? reject(err) : resolve(posts);
                });
        });
        return deletedPost;
    }
}

module.exports = removePost;