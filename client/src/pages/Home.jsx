import AddFolder from '../components/AddFolder/index.jsx';
import FolderList from '../components/FolderList/index.jsx';

import { useQuery } from '@apollo/client';
import { QUERY_NOTES, QUERY_FOLDERS } from '../utils/queries.js';

function Home() {
    console.log("✅ Home page is rendering!")

    const { loading: loadingFolders, error: errorFolders, data: dataFolders } = useQuery(QUERY_FOLDERS);
    const { loading: loadingNotes, error: errorNotes, data: dataNotes } = useQuery(QUERY_NOTES);

    let noteCount = 1;
    let folderCount = 1;

    console.log("🔍 Loading:", loadingFolders);
    console.log("❌ Error:", errorFolders);
    console.log("📊 Data:", dataFolders);

    console.log("🔍 Loading:", loadingNotes);
    console.log("❌ Error:", errorNotes);
    console.log("📊 Data:", dataNotes);

    const folders = dataFolders?.folders || [];
    const notes = dataNotes?.notes || [];

    if (errorNotes) return <div>Error: {errorNotes.message}</div>;

    return (
        <>
            <FolderList/>
            <br />
            <h1>Here are all of my Notes</h1>
            {loadingNotes ? (
                <div>Loading...</div>
            ) : (
                notes.map(note => (
                    <div key={note._id}>
                        <h2>{`${noteCount++}.) ${note.title}`}</h2>
                        <p>{note.text}</p>
                        <p><i>Created On: {note.createdAt}</i></p>
                    </div>
                ))
            )}
            <hr />
            <h1>Here are all of my Folders</h1>
            {loadingFolders ? (
                <div>Loading...</div>
            ): (
                folders.map(folder => (
                    <div key={folder._id}>
                        <h2>{`${folderCount++}.) ${folder.title}`}</h2>
                        <p>{folder.description}</p>
                        <h3><u>Folder Notes</u></h3>
                        {folder.notes?.map(note => (
                            <div key={note._id}>
                                <h4>{note.title}</h4>
                                <p>{note.text}</p>
                            </div>
                        ))}
                        <br />
                        <p><i>Folder created on: {folder.createdAt}</i></p>
                    </div>
                ))
            )}
            <AddFolder/>
        </>
    );
}

export default Home;