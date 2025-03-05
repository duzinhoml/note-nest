import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext.jsx';

import '../Dashboard/index.css';

function Header({ heading }) {
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm } = useSearch();

    const handleInputChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    }
    
    const clearSearch = () => {
        if (searchTerm) {
            setSearchTerm('');
        }
    }
    
    useEffect(() => {
        if (searchTerm) {
            setSearchTerm('');
            navigate('/');
        }
    }, [searchTerm])

    return (
        // Removed 'col-12'
        <div 
            className="text-light ml-background m-0 my-2 me-4 p-0 settings-header" 
            // style={{ border: '2px solid rgba(0, 255, 4, 0.1)' }}
        >
            <nav class="navbar ml-background w-100">
                <div class="header-container">
                    <h3 className="header-title" style={{ color: 'white' }}>{heading}</h3>
                    <form class="d-flex flex-grow-1 search" style={{ maxWidth: '330px' }} role="search">
                        <span className="input-group-text rounded-end-0" id="basic-addon-1" style={{ cursor: searchTerm ? 'pointer' : 'default' }} onClick={() => clearSearch()}>
                            {searchTerm ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-magnifying-glass"></i>}
                        </span>
                        <input 
                            class="form-control me-2 rounded-start-0 header-input" 
                            type="text"
                            name="search"
                            value={searchTerm}
                            placeholder="Search by title, content, or tags..." 
                            autoComplete='off'
                            onChange={handleInputChange}
                            aria-label="Search" 
                            aria-describedby="basic-addon1"
                        />
                    </form>
                    <div className='profile' style={{ fontSize: '18px' }} onClick={() => navigate('/')}>ML</div>
                </div>
            </nav>
        </div>
    );
};

export default Header;