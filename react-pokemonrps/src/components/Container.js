var playerHealth = 100;
var comHealth = 100;

const Container = () => {
  // Determine damage dealt
  const damage = (victim) => {
    var playerDamage = 20;
    var comDamage = 20;
    const missAtack = Math.floor(Math.random() * 8);
    const crit = Math.floor(Math.random() * 8);
    if (missAtack === 1) {
      if (victim === 1) {
        console.log("You missed!");
        comDamage = 0;
      } else {
        console.log("The computer missed!");
        playerDamage = 0;
      }
    } else if (crit === 1) {
      if (victim === 1) {
        console.log("You got a crit!");
        comDamage = 40;
        comHealth -= comDamage;
      } else {
        console.log("The computer got a crit!");
        playerDamage = 40;
        playerHealth -= playerDamage;
      }
    } else {
      if (victim === 1) {
        comHealth -= comDamage;
      } else {
        playerHealth -= playerDamage;
      }
    }
    console.log("You have ", playerHealth, " health");
    console.log("The computer has ", comHealth, " health");
    return damage;
  };
  return (
    <div>
      <button onClick={damage(1)}>Fire</button>
      <button>Grass</button>
      <button>Ice</button>
      <button>Ground</button>
      <button>Rock</button>
    </div>
  );
};

export default Container;
