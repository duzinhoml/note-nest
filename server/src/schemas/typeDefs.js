const typeDefs = `
    type User {
        _id: ID!
        fullName: String
        initials: String
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
        folders: [Folder]
        notes: [Note]
        tags: [String]
        createdAt: String!
    }

    type Folder {
        _id: ID!
        title: String!
        description: String
        notes: [Note]
        createdAt: String!
    }

    type Note {
        _id: ID!
        title: String!
        text: String!
        tags: [String]
        isArchived: Boolean
        folderId: ID
        createDate: String!
        createdAt: String!
        updateDate: String!
        updatedAt: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input CreateUserInput {
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
    }

    input CreateFolderInput {
        title: String!
        description: String
    }

    input CreateNoteInput {
        title: String!
        text: String!
        tags: [String]
    }

    input UpdateUserInput {
        username: String
        email: String
        password: String
    }

    input UpdatePasswordInput {
        currentPassword: String!
        newPassword: String!
        confirmPassword: String!
    }

    input UpdateFolderInput {
        title: String
        description: String
        notes: [ID!]
    }

    input UpdateNoteInput {
        title: String
        text: String
        tags: [String]
        isArchived: Boolean
    }

    type Query {
        users: [User]
        user(username: String!): User
        me: User
        folders: [Folder]
        folder(folderId: ID!): Folder
        notes: [Note]
        note(noteId: ID!): Note
    }

    type Mutation {
        createUser(input: CreateUserInput!): Auth
        login(email: String, username: String, password: String!): Auth
        createFolder(input: CreateFolderInput!): Folder
        createNote(folderId: ID, input: CreateNoteInput!): String

        updateUser(input: UpdateUserInput!): User
        updatePassword(input: UpdatePasswordInput!): User
        updateFolder(folderId: ID!, input: UpdateFolderInput!): Folder
        updateNote(noteId: ID!, input: UpdateNoteInput!): Note

        deleteUser(confirmDelete: String!): String
        deleteUserById(userId: ID!): String
        deleteFolder(folderId: ID!): String
        deleteNoteFromFolder(folderId: ID!, noteId: ID!): Folder
        deleteNote(noteId: ID!): String
        deleteTagFromNote(noteId: ID!, tagName: String!): Note
    }
`;

export default typeDefs;