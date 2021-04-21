const Description = () => {
  return (
    <div id="description">
      <h3>Description</h3>
      <p>
        This is a turn based combat game that follows the core principles of
        rock, paper, scissors with some Pokemon sprinkled in. You will be facing
        against a bot that will randomly pick its' moves against you.
      </p>
      <br />
      <h3>How to Play</h3>
      <p>
        Each game starts each player with 100 health. The user will choose a
        type to use each round and the bot will do the same. Whoever has the
        winning matchup, deals 20 damage to their opponent. There is also a
        chance to miss or get a critical hit on a win. If you miss, you deal 0
        damage. |If you win, you deal double. If both players happen to choose
        the same type, it is a tie and neither players lose health. Once a
        player reaches 0 health, the game ends.
      </p>
      <h3>Type Matchups</h3>
      <ul>
        <li>
          <button className="fire">Fire</button> -&gt;{" "}
          <button className="grass">Grass</button>/
          <button className="ice">Ice</button>
        </li>
        <li>
          <button className="grass">Grass</button> -&gt;{" "}
          <button className="ground">Ground</button>/
          <button className="rock">Rock</button>
        </li>
        <li>
          <button className="ice">Ice</button> -&gt;{" "}
          <button className="ground">Ground</button>/
          <button className="grass">Grass</button>
        </li>
        <li>
          <button className="ground">Ground</button> -&gt;{" "}
          <button className="fire">Fire</button>/
          <button className="rock">Rock</button>
        </li>
        <li>
          <button className="rock">Rock</button> -&gt;{" "}
          <button className="fire">Fire</button>/
          <button className="ice">Ice</button>
        </li>
      </ul>
    </div>
  );
};

export default Description;
