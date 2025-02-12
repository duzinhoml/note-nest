import { Note } from '../models/index.js';

const resolvers = {
    Query: {
        notes: async () => {
            return await Note.find({});
        },
        note: async (_, { noteId }) => {
            return await Note.findOne({ _id: noteId });
        }
    },
    Mutation: {
        createNote: async (_, { input }) => {
            try {
                await Note.create({ ...input });
                return 'Note created successfully';
            } 
            catch (err) {
                return 'Failed to create note'
            }
        },
        updateNote: async (_, { noteId, input }) => {
            try {
                const note = await Note.findOneAndUpdate(
                    { _id: noteId },
                    // { $set: {
                    //     title: input.title,
                    //     text: input.text
                    // }},
                    { $set: { ...input }},
                    { new: true }
                );

                if (!note) {
                    return 'Note not found';
                }
                return note;
            } 
            catch (err) {
                return 'Failed to update note'
            }
        },
        deleteNote: async (_, { noteId }) => {
            try {
                const deletedNote = await Note.findOneAndDelete({ _id: noteId });

                if (!deletedNote) {
                    return 'Note not found';
                }
                return 'Note deleted successfully';

                // Once users are created, use this
                // const result = await Note.findOneAndUpdate(
                //     {}
                // )
            } 
            catch (err) {
                return 'Failed to delete note'
            }
        }
    }
};

export default resolvers;