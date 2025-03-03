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
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (timestamp) => {
            //     const formattedDate = timestamp.toLocaleString('en-US', {
            //         year: 'numeric',
            //         month: 'short',
            //         day: '2-digit',
            //         hour: '2-digit',
            //         minute: '2-digit',
            //         second: '2-digit',
            //         hour12: true
            //       });
            //       return formattedDate.replace(/(\d{2}),/, '$1.');
            // }
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

noteSchema.virtual("createDate").get(function () {
    const createdAt = new Date(this.createdAt);
  
    const day = createdAt.getDate().toString().padStart(2, '0');
    const month = createdAt.toLocaleString('en-US', { month: 'short' });
    const year = createdAt.getFullYear();
  
    return `${day} ${month}. ${year}`;
  });
  

const Note = model('Note', noteSchema);

export default Note;