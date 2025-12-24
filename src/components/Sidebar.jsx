import './Sidebar.css';

function Sidebar({ currentView, onNavigate, isOpen, onClose, isReadOnly, onLogout, currentTheme, onToggleTheme }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', group: 'General' },
        { id: 'mosque-profile', label: 'Mosque Profile', icon: '⚙️', group: 'General' },

        // Member Management
        { id: 'members', label: 'Members', icon: '👥', group: 'Members' },
        { id: 'add-member', label: 'Add Member', icon: '➕', group: 'Members' },

        // General Donations
        // { id: 'record-payment', label: 'Record Payment', icon: '💰', group: 'Donations' },

        // Imam Salary
        { id: 'imam-salary', label: 'Imam Salary', icon: '🕌', group: 'Imam Salary' },
        { id: 'record-imam-salary', label: 'Record Imam Salary', icon: '💵', group: 'Imam Salary' },

        // Mosque Income
        { id: 'mosque-income', label: 'Mosque Income', icon: '📊', group: 'Income' },
        { id: 'add-mosque-income', label: 'Add Income', icon: '➕', group: 'Income' },

        // Expenses
        { id: 'expenses', label: 'Expenses', icon: '💸', group: 'Expenses' },
        { id: 'add-expense', label: 'Add Expense', icon: '➖', group: 'Expenses' },
    ];

    // Filter items based on read-only mode
    const filteredItems = isReadOnly 
        ? menuItems.filter(item => 
            !item.id.startsWith('add-') && 
            !item.id.startsWith('record-') &&
            item.id !== 'mosque-profile'
          )
        : menuItems;

    // Group menu items
    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.group]) {
            acc[item.group] = [];
        }
        acc[item.group].push(item);
        return acc;
    }, {});

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
            <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-header-mobile">
                    <h3>Menu</h3>
                    <button className="close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    {Object.entries(groupedItems).map(([group, items]) => (
                        <div key={group} className="sidebar-group">
                            <div className="sidebar-group-title">{group}</div>
                            {items.map((item) => (
                                <button
                                    key={item.id}
                                    className={`sidebar-item ${currentView === item.id ? 'active' : ''}`}
                                    onClick={() => onNavigate(item.id)}
                                >
                                    <span className="sidebar-icon">{item.icon}</span>
                                    <span className="sidebar-label">{item.label}</span>
                                    {currentView === item.id && (
                                        <div className="active-indicator" />
                                    )}
                                </button>
                            ))}
                        </div>
                    ))}
                    
                    <div className="sidebar-group" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                        <button
                            className="sidebar-item"
                            onClick={onToggleTheme}
                        >
                            <span className="sidebar-icon">{currentTheme === 'dark' ? '☀️' : '🌙'}</span>
                            <span className="sidebar-label">{currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>
                        <button
                            className="sidebar-item"
                            onClick={onLogout}
                            style={{ color: '#ef4444' }}
                        >
                            <span className="sidebar-icon">🚪</span>
                            <span className="sidebar-label">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
