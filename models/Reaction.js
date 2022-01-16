const { format } = require('express/lib/response');
const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/data')

// Schema to create Thought model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlegnth: 280,
            minlength: 1,
            
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => formatDate(timestamp)
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
