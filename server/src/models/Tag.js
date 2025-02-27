import { Schema, model } from 'mongoose';

const tagSchema = new Schema(
    {
        name: {
            type: String,
            trim: true
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

const Tag = model('Tag', tagSchema);

export default Tag;