
function Sidebar() {

    return (
        <div 
            className="text-light ml-background col-2 m-3 mt-3 p-0" 
            style={{ 
                // border: '2px solid rgba(0, 255, 4, 0.1)',
            }}
        >
            <div className="pb-3">
                <h3>
                    <span className="me-2"><i class="fa-solid fa-pencil"></i></span>
                    NoteNest
                </h3>
                {/* <hr /> */}
            </div>
            
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item ml-background d-flex justify-content-between text-light border-bottom-0 rounded">
                        <div>
                            <span className="me-2"><i class="fa-solid fa-house"></i></span>
                            All Notes
                        </div>
                        <span><i class="fa-solid fa-chevron-right"></i></span>
                    </li>
                    <li className="list-group-item ml-background text-light rounded">
                            <span className="me-2"><i class="fa-solid fa-box-archive"></i></span>
                            Archived Notes
                    </li>
                </ul>
            </div>

            <hr />

            <div className="mt-3">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item ml-background text-truncate text-white-50 border-bottom-0">
                        Tags
                    </li>
                    <li className="list-group-item ml-background text-truncate text-light border-bottom-0">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Cooking
                    </li>
                    <li className="list-group-item ml-background text-truncate text-light border-bottom-0">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Dev
                    </li>
                    <li className="list-group-item ml-background text-truncate text-light border-bottom-0">
                        <span className="me-2"><i class="fa-solid fa-tag"></i></span>
                        Fitness
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;