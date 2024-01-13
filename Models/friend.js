const { Schema, model } = require('mongoose');

const friendSchema = new Schema(
    {
        friendId:
        {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
    }
);

const friend = model('friend', friendSchema)

module.exports = friend;