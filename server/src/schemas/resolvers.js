import { User, Folder, Note } from '../models/index.js';

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        user: async (_, { userId }) => {
            const user = await User.findOne({ _id: userId }).populate('folders').populate({
                path: 'folders',
                populate: 'notes'
            });
            if (!user) {
                return 'User not found';
            }
            return user;
        },
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
        createUser: async (_, { input }) => {
            try {
                const user = await User.create({ ...input });
                const userObj = user.toJSON();
                return `${userObj.fullName}, your account has been sucessfully created.`
            } 
            catch (err) {
                return `Failed to create user: ${err.message}`;
            }
        },
        createFolder: async (_, { input }) => {
            try {
                // UNCOMMENT LATER //////////////////////////////////////////////////////////////////
                
                // const { title, description, userId } = input;
                const { title, description } = input;

                // if (userId === '' || userId === undefined) {
                //     return 'User not found'
                // }

                // const user = await User.findOne({ _id: userId })
                // if (!user) {
                //     return 'User not found'
                // }

                const folder = await Folder.create({ title, description });

                // const updatedUser = await User.findOneAndUpdate(
                //     { _id: userId },
                //     { $addToSet: {
                //         folders: folder._id
                //     }},
                //     { new: true }
                // );

                // return `${updatedUser.fullName}, your folder '${folder.title}' has been successfully created.`;
            } 
            catch (err) {
                return `Failed to create folder: ${err.message}`;
            }
        },
        createNote: async (_, { input }) => {
            try {
                const { title, text, folderId } = input;

                if (folderId === '' || folderId === undefined) {
                    const note = await Note.create({ title, text });
                    return `The note '${note.title}' has been successfully created.`;
                }

                const folder = await Folder.findOne({ _id: folderId });
                if (!folder) {
                    return 'Folder not found';
                }

                const note = await Note.create({ title, text });

                const updatedFolder = await Folder.findOneAndUpdate(
                    { _id: folderId },
                    { $addToSet: {
                        notes: note._id
                    }},
                    { new: true }
                );

                return `The note '${note.title}' has been successfully created in the folder '${updatedFolder.title}'.`;
            } 
            catch (err) {
                return `Failed to create note: ${err.message}`;
            }
        },
        updateUser: async (_, { userId, input}) => {
            try {
                const user = await User.findOneAndUpdate(
                    { _id: userId },
                    { $set: { ...input }},
                    { new: true }
                ).populate('folders');

                if (!user) {
                    return 'User not found'
                }
                return user;
            } 
            catch (err) {
                return `Failed to update user: ${err.message}`;
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
                    updateData.$addToSet = {
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
                    return 'Folder not found';
                }
                return folder;
            } 
            catch (err) {
                return `Failed to update folder: ${err.message}`;
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
                return `Failed to update note: ${err.message}`;
            }
        },
        deleteUser: async (_, { userId }) => {
            try {
                const user = await User.findOne({ _id: userId })
                    .populate('folders')
                    .populate({
                        path: 'folders',
                        populate: 'notes' });
                if (!user) {
                    return 'User not found';
                }

                const userObj = user.toJSON();

                const noteIds = user.folders.reduce((acc, folder) => {
                    return acc.concat(folder.notes);
                }, []);

                await Folder.deleteMany({
                    _id: { 
                        $in: user.folders.map(folder => folder._id) 
                    }
                });

                await Note.deleteMany({
                    _id: { 
                        $in: noteIds 
                    }
                });
                
                await User.findOneAndDelete({ _id: userId });

                return `${userObj.fullName}, your account and it's associated notes have been deleted.`
            } 
            catch (err) {
                return `Failed to delete user: ${err.message}`;
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
                return `Failed to delete folder: ${err.message}`;
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
                return `Failed to delete note: ${err.message}`;
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
                return `Failed to delete note: ${err.message}`;
            }
        }
    }
};

export default resolvers;