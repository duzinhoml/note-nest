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
            } catch (err) {
                return 'Failed to create note'
            }
        },
        deleteNote: async (_, { noteId }) => {
            // return await Note.findOneAndDelete({ _id: noteId });
            try {
                const deletedNote = await Note.findOneAndDelete({ _id: noteId });

                if (!deletedNote) {
                    return 'Note not found';
                }
                return 'Note deleted successfully';
            } 
            catch (err) {
                return 'Failed to delete note'
            }
        }
    }
};

export default resolvers;