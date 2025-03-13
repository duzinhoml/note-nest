import '../../components/Dashboard/index.css';
import './index.css';

function SmallHeader() {

    return (
        <div 
            className="text-light m-0 py-2 p-0 header small-bg" 
            style={{
                borderBottomLeftRadius: '6px',
                borderBottomRightRadius: '6px',
                borderBottom: '1px solid hsl(0, 0.00%, 36%)',
            }}
        >
            <nav className="navbar small-bg w-100">
                <div className="header-container">
                    <h3 className="text-light mb-0 ms-3 small-header-title">NoteNest</h3>
                </div>
            </nav>
        </div>
    );
};

export default SmallHeader;