const Header = () => {
  return (
    <nav className="header navbar navbar-dark bg-dark">
      <div className="container-fluid" id="navbarNav">
        <a className="navbar-brand" href="/">
          Pokemon Rock, Paper, Scissors
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/description">
              Description
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
