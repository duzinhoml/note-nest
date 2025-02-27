import { useNavigate } from 'react-router-dom';

import { useNoteList } from "../../context/NoteListContext";

function Notes({ notes }) {
    const navigate = useNavigate();

    const { currentNote, setCurrentNote } = useNoteList();

    const toggleCurrentNote = (note) => {
        if (currentNote && currentNote._id === note._id) {
            setCurrentNote(null);
            navigate('/testing');
        }
        else {
            setCurrentNote(note);
            navigate(`/notes/${note._id}`);
        }
    };

    return (
        // <div 
        //     className="text-light col-3"
        // >
        //     <button
        //         className="btn btn-primary"
        //         style={{ 
        //             // maxWidth: '16.74vw',
        //             // width: '100%',
        //             maxHeight: '2.95vw',
        //             height: '100%',
        //             backgroundColor: '#F63366',
        //             borderColor: '#ba0837',
        //             margin: '0 16px 16px' 
        //         }}
        //     >
        //         + Create New Note
        //     </button>
        //     <div 
        //         id="notes" 
        //         className="m-3 d-flex flex-column"
        //         style={{
        //             // maxWidth: '16.74vw',
        //             // width: '100%',
        //             maxHeight: '7.64vh',
        //             height: '100%',
        //         }}>
        //        {/* <h5>React Performance Optimization</h5>
        //       <div className="d-flex flex-wrap" style={{ fontSize: '12px' }}>
        //            <p className="me-2 mb-2 p-1 bg-secondary rounded">Dev</p>
        //            <p className="me-2 mb-2 p-1 bg-secondary rounded">React</p>
        //        </div>
        //        <small>29 Oct 2024</small> */}
        //         {notes &&
        //             notes.map(note => (
        //                 <div key={note._id}>
        //                     <h5 
        //                         className="mt-3" 
        //                         onClick={() => toggleCurrentNote(note)}
        //                     >
        //                         {note.title}
        //                     </h5>
        //                     <div className="d-flex" style={{ fontSize: '12px' }}>
        //                         {note.tag ? (
        //                             <>
        //                                 <p className="me-2 mb-2 p-1 bg-secondary rounded">{note.tag}</p>
        //                                 <p className="me-2 mb-2 p-1 bg-secondary rounded">{note.tag}</p>
        //                             </>
        //                         ) : ('')}
        //                     </div>
        //                     <small>{note.createdAt || '28 Oct 2024'}</small>
        //                 </div>
        //             ))
        //         }
        //     </div>
        // </div>
        <div 
            className="col-3 p-0 pt-4" 
            style={{ 
                // border: '5px solid rgba(0, 255, 4, 0.1)',
                borderTop: '1px solid hsl(0, 0.00%, 36%)',
            }}
        >
            <div className="container-fluid d-flex flex-column">
                <button 
                    className="btn btn-danger text-light mb-2 p-2"
                    style={{
                        backgroundColor: '#F63366',
                        borderColor: '#ba0837'
                    }}
                >
                    + Create New Note
                </button>

                {/* <div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item p-2 bg-dark bg-gradient text-light border-bottom-0 rounded">
                            <h5 className=''>React Performance Optimization</h5>
                            <div className="d-inline-flex flex-wrap mt-2">
                                <p className='me-2 p-1 bg-secondary bg-gradient rounded' style={{ fontSize: '12px' }}>Dev</p>
                                <p className='me-2 p-1 bg-secondary bg-gradient rounded' style={{ fontSize: '12px' }}>React</p>
                            </div>
                            <small className='mt-0 d-block'>29 Oct 2024</small>
                        </li>
                        <li className="list-group-item p-2 ml-background text-light rounded">
                            <h5 className=''>Fitness Goals 2025</h5>
                            <div className="d-inline-flex flex-wrap mt-2">
                                <p className='me-2 p-1 bg-secondary bg-gradient rounded' style={{ fontSize: '12px' }}>Fitness</p>
                                <p className='me-2 p-1 bg-secondary bg-gradient rounded' style={{ fontSize: '12px' }}>Health</p>
                                <p className='me-2 p-1 bg-secondary bg-gradient rounded' style={{ fontSize: '12px' }}>Personal</p>
                            </div>
                            <small className=' d-block'>22 Sep 2024</small>
                        </li>
                    </ul>
                </div> */}
                <div>
                    <ul className="list-group list-group-flush">
                        {notes &&
                            notes.map(note => (
                                <li key={note._id} className='list-group-item mt-2 p-2 bg-dark bg-gradient text-light border-bottom-0 rounded' onClick={() => toggleCurrentNote(note)} style={{ cursor: 'pointer' }}>
                                    <h5>{note.title}</h5>
                                    {note.tags ?
                                        note.tags.map(tag => (
                                            <div className="d-inline-flex flex-wrap mt-2">
                                                <p className="me-2 p-1 bg-secondary bg-gradient rounded" style={{ fontSize: '12px' }}>{tag}</p>
                                            </div>
                                        )) : ('')
                                    }
                                    <small className='mt-0 d-block'>{note.createdAt}</small>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notes;