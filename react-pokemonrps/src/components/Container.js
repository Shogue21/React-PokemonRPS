import { useState } from "react";

const Container = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [comHealth, setComHealth] = useState(100);
  const [isMiss, setIsMiss] = useState(false);
  const [isCrit, setIsCrit] = useState(false);
  const [result, setResult] = useState("");

  // Randomly choose computer choice
  const comChoice = () => {
    const choices = ["fire", "grass", "rock", "ice", "ground"];
    return choices[Math.floor(Math.random() * choices.length)];
  };
  // Determine damage dealt
  const damage = () => {
    setIsMiss(false);
    setIsCrit(false);
    var damage = 20;
    const missAtack = Math.floor(Math.random() * 8);
    const crit = Math.floor(Math.random() * 8);
    if (missAtack === 1) {
      damage = 0;
      console.log("Miss");
      setIsMiss(true);
    } else if (crit === 1) {
      damage = 40;
      console.log("Crit!");
      setIsCrit(true);
    }
    return damage;
  };

  // Apply damage to player/com
  const dealDamage = (victim) => {
    if (victim === "player") {
      setPlayerHealth(Math.max(playerHealth - damage(), 0));
    } else {
      setComHealth(Math.max(comHealth - damage(), 0));
    }
  };

  // Determine winner of matchup
  const determineWinner = (choice) => {
    const computerChoice = comChoice();
    if (choice === "fire") {
      if (computerChoice === "fire") {
        setResult("Draw!");
      } else if (computerChoice === "grass" || computerChoice === "ice") {
        setResult("You win!");
        dealDamage("com");
      } else if (computerChoice === "rock" || computerChoice === "ground") {
        setResult("You lose!");
        dealDamage("player");
      }
    } else if (choice === "grass") {
      if (computerChoice === "grass") {
        setResult("Draw!");
      } else if (computerChoice === "rock" || computerChoice === "ground") {
        setResult("You win!");
        dealDamage("com");
      } else if (computerChoice === "fire" || computerChoice === "ice") {
        setResult("You lose!");
        dealDamage("player");
      }
    }
  };
  return (
    <div>
      <div className="health">
        <h3>Player Health: {playerHealth}</h3>
        <h3>Computer Health: {comHealth}</h3>
        {isCrit && <p>Crit!</p>}
        {isMiss && <p>Miss!</p>}
      </div>
      <div className="buttons">
        <button onClick={() => determineWinner("fire")}>Fire</button>
        <button onClick={() => determineWinner("grass")}>Grass</button>
        <button onClick={() => comChoice()}>Ice</button>
        <button>Ground</button>
        <button>Rock</button>
      </div>
      <div className="result">
        <h3>{result}</h3>
      </div>
    </div>
  );
};

export default Container;
