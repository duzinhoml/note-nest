

function NoteActions() {

    return (
        <div 
            className="text-light" 
            style={{ 
                maxWidth: '12.92vw', 
                width: '100%', 
                maxHeight: '56.88vw', 
                height: '100%',
                margin: '0 16px 16px' 
            }}
        >
                <hr style={{ width: '100%', border: 'none' }}/>

            <div className="d-flex flex-column" style={{ maxWidth: '12vw' }}>
                <button className="btn btn-secondary mb-2 text-start">
                    <span className="me-2" style={{ width: '1rem' }}><i class="fa-solid fa-box-archive"></i></span>
                    Archive Note
                </button>
                <button className="btn text-start text-light" style={{ backgroundColor: '#F63366', borderColor: '#ba0837' }}>
                    <span className="me-2" style={{ width: '1rem' }}><i class="fa-solid fa-trash"></i></span>
                    Delete Note
                </button>
            </div>
        </div>
    );
};

export default NoteActions;