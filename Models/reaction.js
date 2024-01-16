const { Schema, Types } = require('mongoose');

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
            max_length: 280,
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
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

reactionSchema.virtual('timestamp').get(function () {
    return new Date().toISOString();
});

// const reaction = model('reaction', reactionSchema)

module.exports = reactionSchema;