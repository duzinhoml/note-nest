const typeDefs = `
    type Note {
        _id: ID
        title: String!
        text: String!
        createdAt: String!
    }

    input NoteInput {
        title: String!
        text: String!
    }

    type Query {
        notes: [Note]!
        note(noteId: ID!): Note
    }

    type Mutation {
        createNote(input: NoteInput!): String
        deleteNote(noteId: ID!): String
    }
`;

export default typeDefs;