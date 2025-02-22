import { useNoteList } from "../components/CRUD/NoteList/NoteListContext.jsx";


function NoteList({ notes }) {
    const { currentNote, setCurrentNote }  = useNoteList();
    console.log(currentNote);

    return (
        <div>
            {notes &&
                notes.map(note => (
                    <div key={note._id} className='card mb-3'>
                        <h4 className="card-header text-light p-2 m-0" style={{ backgroundColor: '#F63366', cursor: 'pointer'}} onClick={() => setCurrentNote(note)}>
                            {note.title} <br />
                        </h4>
                        <div className="card-body bg-light p-2">
                            <p>{note.text}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default NoteList;