

function NoteList({ notes, title }) {
    if (!notes.length) {
        return <h3 className="text-light">No Notes Yet</h3>;
    };

    return (
        <div>
            <h3 className="text-light">{title}</h3>
            {notes &&
                notes.map(note => (
                    <div key={note._id} className='card mb-3'>
                        <h4 className="card-header text-light p-2 m-0" style={{ backgroundColor: '#F63366'}}>
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