import { User, Folder, Note } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import bcrypt from 'bcryptjs';

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        user: async (_, { username }) => {
            const user = await User.findOne({ username })
                .populate('folders')
                .populate({
                    path: 'folders',
                    populate: 'notes'
                })
                .populate('notes');
            if (!user) {
                return 'User not found';
            }
            return user;
        },
        me: async (_, _args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id })
                    .populate('folders')
                    .populate({
                        path: 'folders',
                        populate: 'notes'
                    })
                    .populate({
                        path: 'notes',
                        options: {
                            sort: { updatedAt: -1 }
                        }
                    });

                const allTags = user.notes.flatMap(note => note.tags);
                const uniqueTags = [...new Set(allTags.map(tag => tag))];
                uniqueTags.sort();

                return {
                    ...user.toJSON(),
                    tags: uniqueTags
                }
            }
            throw new AuthenticationError('Not Authenticated');
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
            return await Note.find({}).populate('tags');
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
                const token = signToken(user.username, user.email, user._id)

                return { token, user };
            } 
            catch (err) {
                return `Failed to create user: ${err.message}`;
            }
        },
        login: async (_, { email, username, password }) => {
            const user = await User.findOne({
                 $or: [{ email }, { username }] 
            });
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Not Authenticated');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        createFolder: async (_, { input }, context) => {
            try {
                if (context.user) {
                    const { title, description } = input;
                    const folder = await Folder.create({ title, description });

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id }, 
                        { $addToSet: { folders: folder._id }},
                        { new: true }
                    );

                    if (!updatedUser) {
                        throw new Error('User not found or update failed');
                    }
                    return folder;
                };
            } 
            catch (err) {
                throw new AuthenticationError('You need to be logged in!');
            }
        },
        createNote: async (_, { folderId, input }, context) => {
            try {
                if (context.user) {
                    if (folderId === '' || folderId === undefined) {
                        const note = await Note.create({ ...input });

                        const updatedUser = await User.findOneAndUpdate(
                            { _id: context.user._id },
                            { $addToSet: { 
                                notes: note._id 
                            }},
                            { new: true }
                        );

                        if (!updatedUser) {
                            throw new Error('User not found or update failed');
                        }
                        return `The note '${note.title}' has been successfully created.`;
                    }

                    const note = await Note.create({ ...input });

                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { 
                            notes: note._id 
                        }},
                        { new: true }
                    );

                    await Folder.findOneAndUpdate(
                        { _id: folderId },
                        { $addToSet: {
                            notes: note._id
                        }},
                        { new: true}
                    );
                    return `The note '${note.title}' has been successfully created in the folder.`;
                };
            } 
            catch (err) {
                return `Failed to create note: ${err.message}`;
            }
        },
        updateUser: async (_, { input }, context) => {
            try {
                if (!context.user) {
                    throw new Error('Not authenticated');
                }
        
                // Hash the password manually before updating (since middleware is skipped)
                if (input.password) {
                    const saltRounds = 10;
                    input.password = await bcrypt.hash(input.password, saltRounds);
                }
        
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $set: input },
                    { new: true }
                );
        
                if (!user) {
                    throw new Error('User not found or update failed');
                }
        
                // const token = signToken(user.username, user.email, user._id);
                // if (!token) {
                //     throw new Error('Token generation failed');
                // }
        
                // return { token, user };
                return user;
            } 
            catch (err) {
                throw new Error(`Failed to update user: ${err.message}`);
            }
        },        
        // updateFolder: async (_, { folderId, input }) => {
        //     try {
        //         let updateData = {
        //             $set: {
        //                 title: input.title,
        //                 description: input.description
        //             }
        //         };

        //         if (input.notes && input.notes !== "") {
        //             updateData.$addToSet = {
        //                 notes: {
        //                     $each: [input.notes]
        //                 }
        //             }
        //         };

        //         const folder = await Folder.findOneAndUpdate(
        //             { _id: folderId },
        //             updateData,
        //             { new: true }
        //         ).populate('notes');

        //         if (!folder) {
        //             return 'Folder not found';
        //         }
        //         return folder;
        //     } 
        //     catch (err) {
        //         return `Failed to update folder: ${err.message}`;
        //     }
        // },
        updateNote: async (_, { noteId, input }, context) => {
            try {
                if (context.user) {
                    const note = await Note.findOne({ _id: noteId });
                    
                    if (!note) {
                        return 'Note not found';
                    }
                    // const existingTags = note.tags.map(tag => tag.name);
                    // const newTags = input.tags.filter(tag => !existingTags.includes(tag.name));

                    const updateFields = {
                        ...(input.title && { title: input.title }),
                        ...(input.text && { text: input.text }),
                        ...(typeof input.isArchived === "boolean" && { isArchived: input.isArchived }),
                    };

                    const updateQuery = { $set: updateFields };

                    if (input.tags && input.tags.length > 0) {
                        updateQuery.$addToSet = { tags: { $each: input.tags } };
                    }            

                    const updatedNote = await Note.findOneAndUpdate(
                        { _id: noteId },
                        updateQuery,
                        { new: true, runValidators: true }
                    );
            
                    if (!updatedNote) {
                        throw new Error("Failed to update note");
                    }
    
                    return updatedNote;
                }
            } 
            catch (err) {
                return `Failed to update note: ${err.message}`;
            }
        },
        deleteUser: async (_, _args, context) => {
            try {
                if (context.user) {
                    const user = await User.findOne({ _id: context.user._id})
                        .populate('folders')
                        .populate({
                            path: 'folders',
                            populate: 'notes' })
                        .populate('notes');
                            
                    if (!user) {
                        throw new Error('User not found or update failed');
                    }
                    
                    const userObj = user.toJSON();

                    await Note.deleteMany({
                        _id: { 
                            $in: user.notes.map(note => note._id) 
                        }
                    });

                    await Folder.deleteMany({
                        _id: { 
                            $in: user.folders.map(folder => folder._id) 
                        }
                    });
                    
                    await User.findOneAndDelete({ _id: context.user._id });

                    return `${userObj.fullName}, your account and it's associated notes have been deleted.`
                }

                throw new AuthenticationError('You must be logged in to delete your account.');
            } 
            catch (err) {
                return `Failed to delete user: ${err.message}`;
            }
        },
        deleteFolder: async (_, { folderId }, context) => {
            try {
                if (context.user) {
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

                throw new AuthenticationError('You must be logged in to delete a folder.');
            } 
            catch (err) {
                return `Failed to delete folder: ${err.message}`;
            }
        },
        deleteNoteFromFolder: async (_, { folderId, noteId }, context) => {
            try {
                if (context.user) {
                    return Folder.findOneAndUpdate(
                        { _id: folderId },
                        { $pull: {
                            notes: noteId
                        }},
                        { new: true }
                    );
                }
            } 
            catch (err) {
                return `Failed to delete note: ${err.message}`;
            }
        },
        deleteNote: async (_, { noteId }, context) => {
            try {
                if (context.user) {
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
                }
            } 
            catch (err) {
                return `Failed to delete note: ${err.message}`;
            }
        },
        deleteTagFromNote: async (_, { noteId, tagName }, context) => {
            try {
                if (context.user) {
                    return await Note.findOneAndUpdate(
                        { _id: noteId },
                        { $pull: {
                            tags: tagName
                        }},
                        { new: true }
                    );
                };
            } 
            catch (err) {
                return `Failed to delete tag: ${err.message}`;
            }
        }
    }
};

export default resolvers;