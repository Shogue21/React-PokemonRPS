import { useState } from "react";
import HealthBar from "../components/HealthBar";

const Container = () => {
  const [state, setState] = useState({
    playerHealth: 100,
    comHealth: 100,
    isMiss: false,
    isCrit: false,
    result: "",
    comChoiceVar: "",
    playing: true,
  });

  // Randomly choose computer choice
  const comChoice = () => {
    const choices = ["fire", "grass", "rock", "ice", "ground"];
    const choice = Math.floor(Math.random() * choices.length);
    const newChoice = choices[choice];
    setState(Object.assign({}, state, { comChoiceVar: newChoice }));
    return newChoice;
  };
  // Determine damage dealt
  const damage = () => {
    setState(Object.assign({}, state, { isCrit: false, isMiss: false }));
    var damage = 20;
    const missAtack = Math.floor(Math.random() * 8);
    const crit = Math.floor(Math.random() * 8);
    if (missAtack === 1) {
      damage = 0;
      setState(Object.assign({}, state, { isMiss: true }));
    } else if (crit === 1) {
      damage = 40;
      setState(Object.assign({}, state, { isCrit: true }));
    }
    return damage;
  };

  // Apply damage to player/com
  const dealDamage = (victim) => {
    const dealtDamage = damage();
    if (victim === "player") {
      if (state.playerHealth - dealtDamage <= 0) {
        setTimeout(() => {
          setState(Object.assign({}, state, { playing: false }));
        }, 1000);
      }
      setState(
        Object.assign({}, state, {
          playerHealth: Math.max(state.playerHealth - dealtDamage, 0),
        })
      );
    } else {
      if (state.comHealth - dealtDamage <= 0) {
        setTimeout(() => {
          setState(Object.assign({}, state, { playing: false }));
        }, 1000);
      }
      setState(
        Object.assign({}, state, {
          comHealth: Math.max(state.comHealth - dealtDamage, 0),
        })
      );
    }
  };

  // Determine winner of matchup
  const determineWinner = (choice) => {
    const computerChoice = comChoice();
    if (choice === "fire") {
      if (computerChoice === "fire") {
        setState(
          Object.assign({}, state, {
            result: "Draw!",
            isMiss: false,
            isCrit: false,
          })
        );
      } else if (computerChoice === "grass" || computerChoice === "ice") {
        setState(Object.assign({}, state, { result: "You win!" }));
        dealDamage("com");
      } else if (computerChoice === "rock" || computerChoice === "ground") {
        setState(Object.assign({}, state, { result: "You lose!" }));
        dealDamage("player");
      }
    } else if (choice === "grass") {
      if (computerChoice === "grass") {
        setState(
          Object.assign({}, state, {
            result: "Draw!",
            isMiss: false,
            isCrit: false,
          })
        );
      } else if (computerChoice === "rock" || computerChoice === "ground") {
        setState(Object.assign({}, state, { result: "You win!" }));
        dealDamage("com");
      } else if (computerChoice === "fire" || computerChoice === "ice") {
        setState(Object.assign({}, state, { result: "You lose!" }));
        dealDamage("player");
      }
    } else if (choice === "ice") {
      if (computerChoice === "ice") {
        setState(
          Object.assign({}, state, {
            result: "Draw!",
            isMiss: false,
            isCrit: false,
          })
        );
      } else if (computerChoice === "grass" || computerChoice === "ground") {
        setState(Object.assign({}, state, { result: "You win!" }));
        dealDamage("com");
      } else if (computerChoice === "fire" || computerChoice === "rock") {
        setState(Object.assign({}, state, { result: "You lose!" }));
        dealDamage("player");
      }
    } else if (choice === "ground") {
      if (computerChoice === "ground") {
        setState(
          Object.assign({}, state, {
            result: "Draw!",
            isMiss: false,
            isCrit: false,
          })
        );
      } else if (computerChoice === "fire" || computerChoice === "rock") {
        setState(Object.assign({}, state, { result: "You win!" }));
        dealDamage("com");
      } else if (computerChoice === "ice" || computerChoice === "grass") {
        setState(Object.assign({}, state, { result: "You lose!" }));
        dealDamage("player");
      }
    } else if (choice === "rock") {
      if (computerChoice === "rock") {
        setState(
          Object.assign({}, state, {
            result: "Draw!",
            isMiss: false,
            isCrit: false,
          })
        );
      } else if (computerChoice === "ice" || computerChoice === "fire") {
        setState(Object.assign({}, state, { result: "You win!" }));
        dealDamage("com");
      } else if (computerChoice === "ground" || computerChoice === "grass") {
        setState(Object.assign({}, state, { result: "You lose!" }));
        dealDamage("player");
      }
    }
  };

  //Reset Game
  const playAgain = () => {
    setState(
      Object.assign({}, state, {
        playerHealth: 100,
        comHealth: 100,
        result: "",
        comChoiceVar: "",
        playing: true,
      })
    );
  };

  return (
    <div className="playArea">
      {state.playing ? (
        <>
          <div className="health">
            <h3>Player Health</h3>
            <HealthBar percentage={state.playerHealth} />
            <h3>Computer Health</h3>
            <HealthBar percentage={state.comHealth} />
          </div>
          <div className="buttons">
            <button id="fire" onClick={() => determineWinner("fire")}>
              Fire
            </button>
            <button id="grass" onClick={() => determineWinner("grass")}>
              Grass
            </button>
            <button id="ice" onClick={() => determineWinner("ice")}>
              Ice
            </button>
            <button id="ground" onClick={() => determineWinner("ground")}>
              Ground
            </button>
            <button id="rock" onClick={() => determineWinner("rock")}>
              Rock
            </button>
          </div>
          <div className="result">
            {state.comChoiceVar && (
              <h3>
                The computer chose {state.comChoiceVar}. {state.result}
              </h3>
            )}
            {state.isCrit && (
              <p>
                {state.result === "You win!"
                  ? "You got a crit!"
                  : "The computer got a crit!"}
              </p>
            )}
            {state.isMiss && (
              <p>
                {state.result === "You win!"
                  ? "You missed!"
                  : "The computer missed!"}
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="gameOver">
          <h3>Game over! {state.result}</h3>
          <button onClick={() => playAgain()}>Play Again?</button>
        </div>
      )}
    </div>
  );
};

export default Container;
