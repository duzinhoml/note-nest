const typeDefs = `
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

    input CreateFolderInput {
        title: String!
        description: String
        notes: [ID!]
    }

    input CreateNoteInput {
        title: String!
        text: String!
        folderId: ID
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
        folders: [Folder]
        folder(folderId: ID!): Folder
        notes: [Note]
        note(noteId: ID!): Note
    }

    type Mutation {
        createFolder(input: CreateFolderInput!): String
        createNote(input: CreateNoteInput!): String

        updateFolder(folderId: ID!, input: UpdateFolderInput!): Folder
        updateNote(noteId: ID!, input: UpdateNoteInput!): Note

        deleteFolder(folderId: ID!): String
        deleteNoteFromFolder(folderId: ID!, noteId: ID!): String
        deleteNote(noteId: ID!): String
    }
`;

export default typeDefs;