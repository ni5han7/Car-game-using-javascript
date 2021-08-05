let button = document.getElementById('start'); // button variable initialized with the Button with id='start'.

button.addEventListener('click', function () {

    let petrol = 50;             //petrol variable to store value of petrol.
    let position = 0;            //to store position of the car.
    let distance = 0;            //to store distance of the car generated randomly.
    let move = 0;                //to store the moves of each step of the car.
    const result = [];           //Array to store the final result of the game.
    const petrol_pumps = [];     //to store the petrol pumps generatd randomly.

    document.getElementById('pumps').innerHTML = "";    // clears the element with id pumps.
    document.getElementById('demo').innerHTML = "";     //clears the element with id demo.
    document.getElementById('message').innerHTML = "Game started";

    for (var i = 0; i < 6; i++) {      // loop to generate petrol pumps at 6 random positions.

        if (i < 3) {                   //condition for generating 3 petrol pumps within the distance of 30kms.
            var random_number = Math.floor((Math.random() * 30) + 1);
            if (petrol_pumps.indexOf(random_number) === -1) {          /*condition to make sure no two petrol 
                                                                        pumps are generated at same position*/
                petrol_pumps.push(random_number);
            }
        }
        else {                         //rest 3 petrol pumps will be generated between 30 kms and 100 kms.
            var random_number = Math.floor((Math.random() * 71) + 30);
            if (petrol_pumps.indexOf(random_number) === -1) {
                petrol_pumps.push(random_number);
            }
        }
    }
    petrol_pumps.sort(function (a, b) { //function to sort the petrol_pumps array in ascending order.
        return a - b;
    });
    document.getElementById('pumps').innerHTML = "Petrol pumps generated at " + petrol_pumps; // petrol pumps displayed.

    while (petrol > 0) {        //while loop to calculate the distance, current position of the car, petrol left in the car
        move++; //to count the moves.
        distance = Math.floor((Math.random() * 6) + 1);     //distance calculated randomly.
        if (distance <= petrol / 2) {
            position += distance;           //position incremented by distance generated.
            petrol -= 2 * distance;
        }
        else if (distance > petrol / 2) {   /*if petrol left is not enough to cover the distance generated
                                            i.e., if distance is greater then position will only be incremented
                                            by distance covered with left petrol*/
            position += petrol / 2;
            petrol = 0;
        }
        for (var i = 0; i < 6; i++) {         //for loop to increment petrol if car's position matches petrol pump's position
            if (position == petrol_pumps[i]) { //condition to check if car's position matches petrol pump's position
                petrol += 30;
                break;                        // if the condition is true, terminate and exit the loop
            }
        }
        if (petrol > 0 && position < 100) {   //as long as petrol > 0 and position < 100, game will continue.

            result[move - 1] = "Move " + move + " - car at " + position + ", petrol remaining " + petrol;
        }
        else if (petrol >= 0 && position >= 100) { /*if car reaches position of 100 or more even if petrol finishes, 
                                                    the it's a victory.*/
            result[move - 1] = "Move " + move + " - car at 100, petrol remaining " + petrol + "<br/>Victory!";
            break;                               //exit the while loop when its a victory(car reaches 100).
        }
        else {                                   //if petrol finishes or becomes 0 then Game is over.
            result[move - 1] = "Move " + move + " - car at " + position + ", petrol remaining 0 <br/> Game Over";
        }
    }
    for (var i = 1; i <= move; i++) {           //for loop to display the positions.
        document.getElementById('demo').innerHTML += "<br/>" + result[i - 1];

    }
})