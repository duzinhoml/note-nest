import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        text: {
            type: String,
            required: true,
            trim: true
        },
        tags: [
            {
                type: String,
                trim: true
            }
        ],
        isArchived: {
            type: Boolean,
            default: false
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        // },
        // updatedAt: {
        //     type: Date,
        //     default: Date.now
        // }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
        timestamps: true
    }
);

noteSchema.virtual("createDate").get(function () {
    const createdAt = new Date(this.createdAt);
  
    const day = createdAt.getDate().toString().padStart(2, '0');
    const month = createdAt.toLocaleString('en-US', { month: 'short' });
    const year = createdAt.getFullYear();
  
    return `${day} ${month}. ${year}`;
});

noteSchema.virtual('updateDate').get(function() {
    const updatedAt = new Date(this.updatedAt);

    const day = updatedAt.getDate().toString().padStart(2, '0');
    const month = updatedAt.toLocaleString('en-US', { month: 'short' });
    const year = updatedAt.getFullYear();
    let hours = updatedAt.getHours();
    const minutes = updatedAt.getMinutes().toString().padStart(2, '0');
    
    const period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    return `${day} ${month}. ${year} at ${hours}:${minutes}${period}`;
});
  

const Note = model('Note', noteSchema);

export default Note;