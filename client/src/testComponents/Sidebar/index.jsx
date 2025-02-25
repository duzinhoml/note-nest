

function Sidebar() {

    return (
        <div 
            className="text-light" 
            style={{ 
                maxWidth: '19vw', 
                width: '100%',
                margin: '1.67vw 1.11vw 1.11vw'
            }}>
            <div id="header" className='d-flex justify-content-between'>
                <h5 className="mb-4 text-truncate">
                    <span className="me-2"><i class="fa-solid fa-pencil"></i></span>
                    Notes
                </h5>
            </div>
            <div id="content">
                <div id="notes">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="text-truncate">
                            <span className="me-2"><i class="fa-solid fa-house"></i></span>
                            All Notes
                        </p>
                        <p>{'>'}</p>
                    </div>
                    <p className="text-truncate">
                        <span className="me-2"><i class="fa-solid fa-box-archive"></i></span>
                        Archived Notes
                    </p>
                </div>
                <hr style={{ width: '100%' }}/>
                <div id="tags">
                    <p className="text-white-50">Tags</p>
                    <p className="text-truncate">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Cooking
                    </p>
                    <p className="text-truncate">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Dev
                    </p>
                    <p className="text-truncate">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Fitness
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;