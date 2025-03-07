import { useNoteList } from "../../context/NoteListContext.jsx";

import AddNote from "../AddNote/index.jsx";
import UpdateNote from "../UpdateNote/index.jsx";

function SingleNote() {
    const { currentNote } = useNoteList();

    return (
        // <div 
        //     className="text-light" 
        //     style={{ 
        //         maxWidth: '40.75vw', 
        //         width: '100%', 
        //         maxHeight: '56.88vw', 
        //         width: '100%',
        //         margin: '0 16px 16px' 
        //     }}
        // >
        //         <hr style={{ width: '100%', border: 'none' }}/>

        //     <div>
        //         <h3>Enter a title...</h3>
        //     </div>

        //     <div className="row row-cols-1 row-cols-md-2 mt-3">
        //         <div className="col">
        //             <span className="me-2"><i class="fa-solid fa-tag"></i></span>
        //             Tags
        //         </div>
        //         <div className="col">Dev, React</div>
        //         <div className="col">
        //             <span className="me-2"><i class="fa-solid fa-clock"></i></span>
        //             Last edited
        //         </div>
        //         <div className="col">29 Oct 2024</div>
        //     </div>

        //     <hr className="mt-4" style={{ width: '100%' }}/>

        //     <div className="mt-4">
        //         <textarea 
        //             className="ml-background text-light"
        //             type="text"
        //             placeholder="Start typing your note here..."
        //             style={{ 
        //                 maxWidth: '37.5vw', 
        //                 width: '100%', 
        //                 height: '46.38vw', 
        //                 border: 'none', 
        //                 resize: 'none'
        //             }}
        //         ></textarea>
        //     </div>

        //     <div className="d-flex flex-column flex-md-row mt-3">
        //         <button 
        //             className="btn btn-primary me-md-3 mb-2 mb-md-0"
        //             style={{ 
        //                 backgroundColor: '#F63366',
        //                 borderColor: '#ba0837'
        //             }}
        //         >
        //             Save Note
        //         </button>
        //         <button className="btn btn-secondary">
        //             Cancel
        //         </button>
        //     </div>
        // </div>
        <>
            {currentNote ? (
                <UpdateNote />
            ) : (
                <AddNote/>
            )}
        </>
    );
};

export default SingleNote;