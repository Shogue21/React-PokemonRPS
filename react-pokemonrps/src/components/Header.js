const Header = () => {
  return (
    <nav class="header navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">
        Pokemon Rock, Paper, Scissors
      </a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/description">
              Description
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
