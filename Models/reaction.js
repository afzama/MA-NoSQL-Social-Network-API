const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId:
        {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username:
        {
            type: String,
            required: true,
        },
        createdAt:
        {
            type: Date,
            default: Date.now(),
            // get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

// reactionSchema.virtual('timestamp').get(function () {
//     return new Date().toISOString();
// });

const Reaction = model('Reaction', reactionSchema)

module.exports = Reaction;