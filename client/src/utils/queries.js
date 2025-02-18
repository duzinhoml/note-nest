import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            fullName
            username
            email
            folders {
                _id
                title
                description
            }
            notes {
                _id
                title
                text
            }
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            fullName
            username
            email
            folders {
                _id
                title
                description
            }
            notes {
                _id
                title
                text
            }
        }
    }
`;

export const QUERY_FOLDERS = gql`
    query allFolders {
        folders {
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

export const QUERY_SINGLE_FOLDER = gql`
    query singleFolder($folderId: ID!) {
        folder(folderId: $folderId) {
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

export const QUERY_NOTES = gql`
    query allNotes {
        notes {
            _id
            title
            text
            createdAt
        }
    }
`;

export const QUERY_SINGLE_NOTE = gql`
    query singleNote($noteId: ID!) {
        note(noteId: $noteId) {
            _id
            title
            text
            createdAt
        }
    }
`;