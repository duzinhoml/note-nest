import { Link } from 'react-router-dom';

function TestNoteList({ notes, title }) {
    if (!notes.length) {
        return <h3>No Notes Yet</h3>;
    };

    return (
        <div>
            <h3>{title}</h3>
            {notes &&
                notes.map(note => (
                    <div key={note._id} className='card mb-3'>
                        <h4 className="card-header bg-primary text-light p-2 m-0">
                            {note.title} <br />
                        </h4>
                        <div className="card-body bg-light p-2">
                            <p>{note.text}</p>
                        </div>
                        <Link 
                            className='btn btn-primary btn-block btn-squared'
                            to={`/notes/${note._id}`}
                        >
                            View Full Note.
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default TestNoteList;