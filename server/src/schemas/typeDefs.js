const typeDefs = `
    type User {
        _id: ID!
        fullName: String
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
        folders: [Folder]
        notes: [Note]
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
        folderId: ID
        createdAt: String!
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
        notes: [ID!]
    }

    input CreateNoteInput {
        title: String!
        text: String!
    }

    input UpdateUserInput {
        username: String
        email: String
        password: String
    }

    input UpdateFolderInput {
        title: String
        description: String
        notes: [ID!]
    }

    input UpdateNoteInput {
        title: String
        text: String
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        folders: [Folder]
        folder(folderId: ID!): Folder
        notes: [Note]
        note(noteId: ID!): Note
    }

    type Mutation {
        createUser(input: CreateUserInput!): String
        createFolder(userId: ID, input: CreateFolderInput!): String
        createNote(folderId: ID, input: CreateNoteInput!): String

        updateUser(userId: ID!, input: UpdateUserInput!): User
        updateFolder(folderId: ID!, input: UpdateFolderInput!): Folder
        updateNote(noteId: ID!, input: UpdateNoteInput!): Note

        deleteUser(userId: ID!): String
        deleteFolder(folderId: ID!): String
        deleteNoteFromFolder(folderId: ID!, noteId: ID!): String
        deleteNote(noteId: ID!): String
    }
`;

export default typeDefs;