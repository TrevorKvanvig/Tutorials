export default function Menu() {
    return (
        <nav className="navbar navbar-expand bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand">React Movies</a>

                <div className="collapse navbar-collapse d-flex">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link">Genres</a>
                        </li>
                    </ul>
                </div>
            </div>       
        </nav>
    )
}