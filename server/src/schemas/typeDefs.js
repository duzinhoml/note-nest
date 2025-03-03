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
        tags: [String]
        isArchived: Boolean
        folderId: ID
        createDate: String!
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

        updateUser(userId: ID!, input: UpdateUserInput!): User
        updateFolder(folderId: ID!, input: UpdateFolderInput!): Folder
        updateNote(noteId: ID!, input: UpdateNoteInput!): Note

        deleteUser: String
        deleteFolder(folderId: ID!): String
        deleteNoteFromFolder(folderId: ID!, noteId: ID!): Folder
        deleteNote(noteId: ID!): String
        deleteTagFromNote(noteId: ID!, tagId: ID!): Note
    }
`;

export default typeDefs;