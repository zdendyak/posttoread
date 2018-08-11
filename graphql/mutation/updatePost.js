const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
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

const updatePost = {
    type: postType,
    args: {
        id: {
            name: 'id',
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
        }
    },
    resolve: (root, params, source, fieldASTs) => {
        const projections = getProjection(fieldASTs);
        
        const updatedPost = new Promise((resolve, reject) => {
            Post.findByIdAndUpdate(
                params.id, 
                { $set: params }, 
                projections, 
                (err, posts) => {
                    err ? reject(err) : resolve(posts);
                });
        });
        return updatedPost;
    }
}

module.exports = updatePost;