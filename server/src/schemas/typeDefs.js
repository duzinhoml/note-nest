const typeDefs = `
    type Note {
        _id: ID!
        title: String!
        text: String!
        createdAt: String!
    }

    input CreateNoteInput {
        title: String!
        text: String!
    }

    input UpdateNoteInput {
        title: String
        text: String
    }

    type Query {
        notes: [Note]
        note(noteId: ID!): Note
    }

    type Mutation {
        createNote(input: CreateNoteInput!): String

        updateNote(noteId: ID!, input: UpdateNoteInput!): Note

        deleteNote(noteId: ID!): String
    }
`;

export default typeDefs;