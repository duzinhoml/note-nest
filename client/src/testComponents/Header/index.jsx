import '../Dashboard/index.css';

function Header({ heading }) {

    return (
        // Removed 'col-12'
        <div 
            className="text-light ml-background m-0 mt-2 mb-2 p-0 header" 
            // style={{ border: '2px solid rgba(0, 255, 4, 0.1)' }}
        >
            <nav class="navbar ml-background w-100">
                <div class="container-fluid d-flex justify-content-between">
                    <h3 style={{ color: 'white' }}>{heading}</h3>
                    <form class="d-flex flex-grow-1" style={{ maxWidth: '330px' }}role="search">
                        <span className="input-group-text rounded-end-0" id="basic-addon-1" style={{ cursor: 'pointer' }}>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input 
                            class="form-control me-2 rounded-start-0" 
                            type="search" 
                            placeholder="Search by title, content, or tags..." 
                            aria-label="Search" 
                            aria-describedby="basic-addon1"
                        />
                    </form>
                </div>
            </nav>
        </div>
    );
};

export default Header;