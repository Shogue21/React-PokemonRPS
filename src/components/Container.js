import { useState } from "react";
import HealthBar from "../components/HealthBar";

const Container = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [comHealth, setComHealth] = useState(100);
  const [isMiss, setIsMiss] = useState(false);
  const [isCrit, setIsCrit] = useState(false);
  const [result, setResult] = useState("");
  const [comChoiceVar, setComChoiceVar] = useState("");
  const [playing, setPlaying] = useState(true);
  const [enabled, setEnabled] = useState(true);

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
    const dealtDamage = damage();
    if (victim === "player") {
      if (playerHealth - dealtDamage <= 0) {
        setEnabled(false);
        setTimeout(() => {
          setPlaying(false);
        }, 1000);
      }
      setPlayerHealth(Math.max(playerHealth - dealtDamage, 0));
    } else {
      if (comHealth - dealtDamage <= 0) {
        setEnabled(false);
        setTimeout(() => {
          setPlaying(false);
        }, 1000);
      }
      setComHealth(Math.max(comHealth - dealtDamage, 0));
    }
  };

  // Determine winner of matchup
  const determineWinner = (choice) => {
    if (enabled) {
      const computerChoice = comChoice();
      if (choice === "fire") {
        if (computerChoice === "fire") {
          setResult("Draw!");
          setIsMiss(false);
          setIsCrit(false);
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
          setIsMiss(false);
          setIsCrit(false);
        } else if (computerChoice === "rock" || computerChoice === "ground") {
          setResult("You win!");
          dealDamage("com");
        } else if (computerChoice === "fire" || computerChoice === "ice") {
          setResult("You lose!");
          dealDamage("player");
        }
      } else if (choice === "ice") {
        if (computerChoice === "ice") {
          setResult("Draw!");
          setIsMiss(false);
          setIsCrit(false);
        } else if (computerChoice === "grass" || computerChoice === "ground") {
          setResult("You win!");
          dealDamage("com");
        } else if (computerChoice === "fire" || computerChoice === "rock") {
          setResult("You lose!");
          dealDamage("player");
        }
      } else if (choice === "ground") {
        if (computerChoice === "ground") {
          setResult("Draw!");
          setIsMiss(false);
          setIsCrit(false);
        } else if (computerChoice === "fire" || computerChoice === "rock") {
          setResult("You win!");
          dealDamage("com");
        } else if (computerChoice === "ice" || computerChoice === "grass") {
          setResult("You lose!");
          dealDamage("player");
        }
      } else if (choice === "rock") {
        if (computerChoice === "rock") {
          setResult("Draw!");
          setIsMiss(false);
          setIsCrit(false);
        } else if (computerChoice === "ice" || computerChoice === "fire") {
          setResult("You win!");
          dealDamage("com");
        } else if (computerChoice === "ground" || computerChoice === "grass") {
          setResult("You lose!");
          dealDamage("player");
        }
      }
    }
  };

  //Reset Game
  const playAgain = () => {
    setPlayerHealth(100);
    setComHealth(100);
    setResult("");
    setComChoiceVar("");
    setPlaying(true);
    setEnabled(true);
    setIsCrit(false);
    setIsMiss(false);
  };

  return (
    <div className="playArea">
      {playing ? (
        <>
          <div className="health">
            <h3>Player Health</h3>
            <HealthBar percentage={playerHealth} />
            <h3>Computer Health</h3>
            <HealthBar percentage={comHealth} />
          </div>
          <div className="buttons">
            <button className="fire" onClick={() => determineWinner("fire")}>
              Fire
            </button>
            <button className="grass" onClick={() => determineWinner("grass")}>
              Grass
            </button>
            <button className="ice" onClick={() => determineWinner("ice")}>
              Ice
            </button>
            <button
              className="ground"
              onClick={() => determineWinner("ground")}
            >
              Ground
            </button>
            <button className="rock" onClick={() => determineWinner("rock")}>
              Rock
            </button>
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
        </>
      ) : (
        <div className="gameOver">
          <h3>Game over! {result}</h3>
          <button onClick={() => playAgain()}>Play Again?</button>
        </div>
      )}
    </div>
  );
};

export default Container;
