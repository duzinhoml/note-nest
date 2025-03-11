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
                input.username = input.username.trim()
                input.email = input.email.trim().toLowerCase();
                input.password = input.password.trim();

                // Email
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailRegex.test(input.email)) {
                    throw new Error('Must match a valid email address.');
                }
                const userEmail = await User.findOne({ email: input.email });
                if (userEmail) {
                    throw new Error('Email already exists.');
                }

                // Username
                if (input.username.length < 3) {
                    throw new Error('Username must be at least 3 characters long.');
                }
                if (input.username.length > 30) {
                    throw new Error('Username cannot exceed 30 characters.');
                }
                const usernameRegex = /^[a-z0-9_-]+$/;
                if (!usernameRegex.test(input.username)) {
                    throw new Error('Username can only contain lowercase letters, numbers, underscores, and dashes.');
                }
                const userUsername = await User.findOne({ username: input.username });
                if (userUsername) {
                    throw new Error('Username already exists.');
                }

                // Password
                if (input.password.length < 8) {
                    throw new Error('Password must be at least 8 characters long.');
                }
                if (input.password.length > 50) {
                    throw new Error('Password cannot exceed 50 characters.');
                }
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(input.password)) {
                    throw new Error('Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.');
                }

                const user = await User.create({ ...input });
                const token = signToken(user.username, user.email, user._id)

                return { token, user };
            } 
            catch (err) {
                throw new Error(`${err.message}`);
            }
        },
        login: async (_, { email, username, password }) => {
            const user = await User.findOne({
                 $or: [{ email }, { username }] 
            });
            if (!user) {
                throw new AuthenticationError('User not found. Please check your username or create a new account.');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect username or password. Please try again.');
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
                
                return user;
            } 
            catch (err) {
                throw new Error(`Failed to update user: ${err.message}`);
            }
        },        
        updatePassword: async (_, { input }, context) => {
            try {
                if (!context.user) {
                    throw new Error('Not authenticated');
                }
                
                const user = await User.findOne({ _id: context.user._id});
                
                input.currentPassword = input.currentPassword.trim();

                const correctPW = await user.isCorrectPassword(input.currentPassword);
                if (!correctPW) {
                    throw new Error('Incorrect password');
                }
                
                if (input.newPassword.length < 8) {
                    throw new Error('Password must be at least 8 characters long.');
                }
                if (input.newPassword.length > 50) {
                    throw new Error('Password cannot exceed 50 characters.');
                }
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(input.newPassword)) {
                    throw new Error('Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.');
                }
                
                if (input.newPassword !== input.confirmPassword) {
                    throw new Error('Passwords do not match');
                }

                const saltRounds = 10;
                input.newPassword = await bcrypt.hash(input.newPassword, saltRounds);

                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $set: {
                        password: input.newPassword
                    }},
                    { new: true }
                );

                if (!updatedUser) {
                    throw new Error('User not found or update failed');
                }
                return updatedUser;
            } 
            catch (err) {
                throw new Error(`${err.message}`);
            }
        },
        updateNote: async (_, { noteId, input }, context) => {
            try {
                if (context.user) {
                    const note = await Note.findOne({ _id: noteId });
                    
                    if (!note) {
                        return 'Note not found';
                    }

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
        deleteUser: async (_, { confirmDelete }, context) => {
            try {
                if (context.user) {
                    if (confirmDelete !== context.user.username) {
                        throw new Error('Incorrect confirmation');
                    }

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
                throw new Error(`${err.message}`);
            }
        },
        deleteUserById: async (_, { userId }) => {
            try {
                const user = await User.findOne({ _id: userId })
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
                    
                    await User.findOneAndDelete({ _id: userId });

                    return `${userObj.fullName}, your account and it's associated notes have been deleted.`
            } 
            catch (err) {
                throw new Error(err.message);
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