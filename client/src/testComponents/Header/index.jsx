

function Header({ heading }) {

    return (
        <div 
            className="m-3 text-light d-flex justify-content-between align-items-center" 
            style={{ maxWidth: '58rem', width: '100%', maxHeight: '3rem', height: '100%' }}
        >
            <h4>{heading ? heading : 'All Notes'}</h4>
            <div className="d-flex align-items-center flex-grow-1 justify-content-end">
                <div class="input-group" style={{ maxWidth: '18.75rem', width: '100%', height: '2.75rem' }}>
                    <span class="input-group-text" id="basic-addon1">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Search by title, content, or tags..." 
                        aria-label="search" 
                        aria-describedby="basic-addon1"
                        style={{ fontSize: '0.875rem' }}
                    />
                </div>
                <i class="fa-solid fa-gear ms-4" style={{ fontSize: '1.25rem' }}></i>
            </div>
        </div>
    );
};

export default Header;