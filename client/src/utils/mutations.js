import { gql } from "@apollo/client";

export const CREATE_FOLDER = gql`
    mutation createFolder($userId: ID, $input: CreateFolderInput!) {
        createFolder(userId: $userId, input: $input)
    }
`;

export const CREATE_NOTE = gql`
    mutation createNote($folderId: ID, $input: CreateNoteInput!) {
        createNote(folderId: $folderId, input: $input)
    }
`;

export const UPDATE_FOLDER = gql`
    mutation updateFolder($folderId: ID!, $input: UpdateFolderInput!) {
        updateFolder(folderId: $folderId, input: $input) {
            _id
            title
            description
            notes {
                _id
                title
                text
            }
            createdAt
        }
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

export const DELETE_FOLDER = gql`
    mutation deleteFolder($folderId: ID!) {
        deleteFolder(folderId: $folderId)
    }
`;

export const DELETE_NOTE = gql`
    mutation deleteNote($noteId: ID!) {
        deleteNote(noteId: $noteId)
    }
`;