import { Folder, Note } from '../models/index.js';

const resolvers = {
    Query: {
        folders: async () => {
            return await Folder.find({}).populate('notes');
        },
        folder: async (_, { folderId }) => {
            const folder = await Folder.findOne({ _id: folderId }).populate('notes');
            if (!folder) {
                return 'Folder not found';
            }
            return folder;
        },
        notes: async () => {
            return await Note.find({});
        },
        note: async (_, { noteId }) => {
            const note = await Note.findOne({ _id: noteId });
            if (!note) {
                return 'Note not found';
            }
            return note;
        }
    },
    Mutation: {
        createFolder: async (_, { input }) => {
            try {
                const folder = await Folder.create({ ...input });
                return `The folder '${folder.title}' has been successfully created`;
            } 
            catch (err) {
                return 'Failed to create folder'
            }
        },
        createNote: async (_, { input }) => {
            try {
                // const note = await Note.create({ ...input });
                const { title, text, folderId } = input;

                if (folderId === '' || folderId === undefined) {
                    const note = await Note.create({ title, text });
                    return `The note '${note.title}' has been successfully created`;
                }

                const folder = await Folder.findOne({ _id: folderId });
                if (!folder) {
                    return 'Folder not found';
                }

                const note = await Note.create({ title, text });

                const updatedFolder = await Folder.findOneAndUpdate(
                    { _id: folderId },
                    { $push: {
                        notes: note._id
                    }},
                    { new: true }
                );

                return `The note '${note.title}' has been successfully created in the folder '${updatedFolder.title}'`;
            } 
            catch (err) {
                return 'Failed to create note'
            }
        },
        updateFolder: async (_, { folderId, input }) => {
            try {
                let updateData = {
                    $set: {
                        title: input.title,
                        description: input.description
                    }
                };

                if (input.notes && input.notes !== "") {
                    updateData.$push = {
                        notes: {
                            $each: [input.notes]
                        }
                    }
                };

                const folder = await Folder.findOneAndUpdate(
                    { _id: folderId },
                    updateData,
                    { new: true }
                ).populate('notes');

                if (!folder) {
                    return { error: 'Folder not found' };
                }
                return folder;
            } 
            catch (err) {
                return 'Failed to update folder'
            }
        },
        updateNote: async (_, { noteId, input }) => {
            try {
                const note = await Note.findOneAndUpdate(
                    { _id: noteId },
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
        deleteFolder: async (_, { folderId }) => {
            try {
                const folder = await Folder.findOne({ _id: folderId });
                if (!folder) {
                    return 'Folder not found';
                }

                await Note.deleteMany({
                    _id: {
                        $in: folder.notes
                    }
                });
                await Folder.findOneAndDelete({ _id: folderId});

                return `The folder '${folder.title}' and its associated notes have been successfully deleted.`;
            } 
            catch (err) {
                return 'Failed to delete note'
            }
        },
        deleteNoteFromFolder: async (_, { folderId, noteId }) => {
            try {
                const note = await Note.findOne({ _id: noteId });
                const folder = await Folder.findOne({ _id: folderId });

                if (!note) {
                    return 'Note not found';
                }
                else if (!folder) {
                    return 'Folder not found';
                }

                await Folder.findOneAndUpdate(
                    { _id: folderId },
                    { $pull: {
                        notes: noteId
                    }},
                    { new: true }
                );

                return `The note '${note.title}' has been successfully deleted from the folder '${folder.title}'.`;
            } 
            catch (err) {
                return 'Failed to delete note'
            }
        },
        deleteNote: async (_, { noteId }) => {
            try {
                const note = await Note.findOne({ _id: noteId });

                if (!note) {
                    return 'Note not found';
                }

                await Folder.updateMany(
                    { notes: noteId },
                    { $pull: {
                        notes: noteId
                    }}
                );

                const deletedNote = await Note.findOneAndDelete({ _id: noteId });

                if (!deletedNote) {
                    return 'Note not found';
                }
                return `The note '${note.title}' has been successfully deleted.`;

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