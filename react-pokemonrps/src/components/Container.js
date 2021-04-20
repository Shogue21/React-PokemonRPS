import { useState } from "react";

const Container = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [comHealth, setComHealth] = useState(100);
  const [isMiss, setIsMiss] = useState(false);
  const [isCrit, setIsCrit] = useState(false);
  const [result, setResult] = useState("");
  const [comChoiceVar, setComChoiceVar] = useState("");

  // Randomly choose computer choice
  const comChoice = () => {
    const choices = ["fire", "grass", "rock", "ice", "ground"];
    const choice = Math.floor(Math.random() * choices.length);
    setComChoiceVar(choices[choice]);
    return choices[choice];
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
      console.log(computerChoice);
      if (computerChoice === "fire") {
        setResult("Draw!");
        console.log("made it.");
      } else if (computerChoice === "grass" || computerChoice === "ice") {
        setResult("You win!");
        dealDamage("com");
        console.log("made it.");
      } else if (computerChoice === "rock" || computerChoice === "ground") {
        setResult("You lose!");
        dealDamage("player");
        console.log("made it.");
      }
    } else if (choice === "grass") {
      if (computerChoice === "grass") {
        setResult("Draw!");
        console.log("made it.");
      } else if (computerChoice === "rock" || computerChoice === "ground") {
        setResult("You win!");
        dealDamage("com");
        console.log("made it.");
      } else if (computerChoice === "fire" || computerChoice === "ice") {
        setResult("You lose!");
        dealDamage("player");
        console.log("made it.");
      }
    }
  };
  return (
    <div>
      <div className="health">
        <h3>Player Health: {playerHealth}</h3>
        <h3>Computer Health: {comHealth}</h3>
      </div>
      <div className="buttons">
        <button onClick={() => determineWinner("fire")}>Fire</button>
        <button onClick={() => determineWinner("grass")}>Grass</button>
        <button onClick={() => comChoice()}>Ice</button>
        <button>Ground</button>
        <button>Rock</button>
      </div>
      <div className="result">
        {comChoiceVar && (
          <h3>
            The computer chose {comChoiceVar}. {result}
          </h3>
        )}
        {isCrit && (
          <p>
            {result === "You win!"
              ? "You got a crit!"
              : "The computer got a crit!"}
          </p>
        )}
        {isMiss && (
          <p>
            {result === "You win!" ? "You missed!" : "The computer missed!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Container;
