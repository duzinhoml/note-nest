import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($password: String!, $email: String, $username: String) {
        login(password: $password, email: $email, username: $username) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_FOLDER = gql`
    mutation createFolder($input: CreateFolderInput!) {
        createFolder(input: $input) {
            _id
            title
            description
            createdAt
            notes {
                _id
                title
                text
            }
        }
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
            tags
            createDate
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser {
        deleteUser
    }
`;

export const DELETE_FOLDER = gql`
    mutation deleteFolder($folderId: ID!) {
        deleteFolder(folderId: $folderId)
    }
`;

export const DELETE_NOTE_FROM_FOLDER = gql`
    mutation deleteNoteFromFolder($folderId: ID!, $noteId: ID!) {
        deleteNoteFromFolder(folderId: $folderId, noteId: $noteId) {
            _id
            title
            description
        }
    }
`;

export const DELETE_NOTE = gql`
    mutation deleteNote($noteId: ID!) {
        deleteNote(noteId: $noteId)
    }
`;

export const DELETE_TAG_FROM_NOTE = gql`
    mutation deleteTagFromNote($noteId: ID!, $tagId: ID!) {
        deleteTagFromNote(noteId: $noteId, tagId: $tagId) {
            _id
            title
            text
            tags {
                _id
                name
            }
        }
    }
`;