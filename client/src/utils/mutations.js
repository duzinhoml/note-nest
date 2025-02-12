import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
    mutation createNote($input: CreateNoteInput!) {
        createNote(input: $input)
    }
`;

export const UPDATE_NOTE = gql`
    mutation updateNote($noteId: ID!, $input: UpdateNoteInput!) {
        updateNote(noteId: $noteId, input: $input) {
            _id
            title
            text
            createdAt
        }
    }
`;

export const DELETE_NOTE = gql`
    mutation deleteNote($noteId: ID!) {
        deleteNote(noteId: $noteId)
    }
`;