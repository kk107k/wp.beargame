function Bear() {
    this.dBear = 100; //How far the bee moves with each button pressed
    this.htmlElement = document.getElementById("bear"); //calling the picture of bear
    this.id = this.htmlElement.id; //id of bear picture
    this.x = this.htmlElement.offsetLeft; 
    this.y = this.htmlElement.offsetTop; 

    
    this.move = function(xDir, yDir) { //xDir moves bear in y axis, yDir moves bear in x axis

        this.x += this.dBear * xDir; //multiplies xDir by the length of the bears specified step to position it in its x axis
        this.y += this.dBear * yDir; //multplies ydir by the length of the bears specified step to position it in its y axis
        this.display(); //sets the new position of the bear on display
    };

   
    this.display = function() { //refreshes display to show new positions
        this.fitBounds(); //checks to see if bear is within specified bounds
        this.htmlElement.style.left = this.x + "px"; //refreshes display to show x axis movement
        this.htmlElement.style.top = this.y + "px"; //refreshes display to show y axis movement
        this.htmlElement.style.display = "block"; //refreshes display to show everything
    };

    this.fitBounds = function() { //checks to see if the bear is within specified bounds
        let parent = this.htmlElement.parentElement; 
        //boundaries
        let iw = this.htmlElement.offsetWidth; 
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;

        //if bear image goes out of y bounds, return it
        if (this.x < 0) this.x = 0;
        if (this.x > w - iw) this.x = w - iw;

        //if bear image goes out of x bounds, return it
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih;
    };
}

function start() { //start function

    bear = new Bear(); //create bear

    document.addEventListener("keydown", moveBear, false); //Add event listener for key presses
    document.getElementById("speedBear").addEventListener("change", setSpeed) //Add event listener to change the input field

    bees = new Array(); //new array to store bees
    makeBees(); //make bees
    updateBees(); //Move bees with the length of specified step
}

function restart() { //restart score
    
    score = 0;
    hits.innerHTML = score;
    duration.innerHTML = 0; //sets duration to 0
    updateTimer = clearTimeout(); //sets timer to 0
    removeBees();
    start(); //calls start function
}

//Handling keyboard events to move the bear
function moveBear(e) { 
    
    //Codes of the 4 arrow keys 
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;
    if (e.keyCode == KEYRIGHT) {
        bear.move(1, 0) //Move the bear to the right
    }
    if (e.keyCode == KEYLEFT) {
        bear.move(-1, 0) //Move the bear to the left
    }
    if (e.keyCode == KEYUP) {
        bear.move(0, -1) //Move the bear up
    }
    if (e.keyCode == KEYDOWN) {
        bear.move(0, 1) //Move the bear down
    }
}

function setSpeed() {
    bear.dBear = parseInt(document.getElementById("speedBear").value); //changes speed to value inputed by user
}

class Bee {
    constructor(beeNumber) {
        
        this.htmlElement = createBeeImg(beeNumber); //the HTML element corresponding to the IMG of the bee
        this.id = this.htmlElement.id; //its HTML ID
        this.x = this.htmlElement.offsetLeft; //the left position (x)
        this.y = this.htmlElement.offsetTop; //the top position (y)

        //move the bees by dx, dy
        this.move = function(dx, dy) {
            this.x += dx; 
            this.y += dy; 
            this.display();
        };

        
        this.display = function() { //refreshes display to show new positions
            this.fitBounds(); //checks to see if bear is within specified bounds
            this.htmlElement.style.left = this.x + "px"; //refreshes display to show x axis movement
            this.htmlElement.style.top = this.y + "px"; //refreshes display to show y axis movement
            this.htmlElement.style.display = "block"; //refreshes display to show everything
        };

    this.fitBounds = function() { //checks to see if the bear is within specified bounds
        let parent = this.htmlElement.parentElement; 
        //boundaries
        let iw = this.htmlElement.offsetWidth; 
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;

        //if bear image goes out of y bounds, return it
        if (this.x < 0) this.x = 0;
        if (this.x > w - iw) this.x = w - iw;

        //if bear image goes out of x bounds, return it
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih;
    };
}
}

function createBeeImg(wNum) {
    //get dimension and position of board div
    let boardDiv = document.getElementById("board");
    let boardDivW = boardDiv.offsetWidth;
    let boardDivH = boardDiv.offsetHeight;
    let boardDivX = boardDiv.offsetLeft;
    let boardDivY = boardDiv.offsetTop;
    //create the IMG element
    let img = document.createElement("img");
    img.setAttribute("src", "images/bee.gif");
    img.setAttribute("width", "100");
    img.setAttribute("alt", "A bee!");
    img.setAttribute("id", "bee" + wNum);
    img.setAttribute("class", "bee"); //set class of html tag img
    //add the IMG element to the DOM as a child of the board div
    img.style.position = "absolute";
    boardDiv.appendChild(img);
    //set initial position 
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivH);
    img.style.left = (boardDivX + x) + "px";
    img.style.top = (y) + "px";
    //return the img object
    return img;
   }
   
function getRandomInt(max) {
    return Math.floor(Math.random() * max); //Generate a random number between 0 and max
}

function makeBees() {

    let beeQty = document.getElementById("beeQty").value; //Get the number of bees specified by the user
    beeQty = Number(beeQty); //Convert input into a number

    if (isNaN(beeQty)) { //if input by user is not a number
        window.alert("Invalid number of bees");
        return;
    }

    //Create bees
    let i = 1;
    while (i <= beeQty) {
        var num = i;
        var bee = new Bee(num);  //create object and its IMG element
        bee.display(); //Display the bee 
        bees.push(bee); //Add the bee object to the bees array
        i++;
    }

}

function addBee() {
    let beeQty = document.getElementById("beeQty").value; //get input from user for quantity
    beeQty = Number(beeQty); //Convert input into number
    beeQty++;
    var bee = new Bee(beeQty); //make bee
    bee.display(); //Display the bee
    bees.push(bee); //Add the bee object to the bees array
}

function removeBees() {
    beesArray = document.getElementsByClassName("bee");
    beesArray.forEach(e => e.remove());
}

function moveBees() {
    let speed = document.getElementById("speedBees").value; //get input from user for speed

    for (let i = 0; i < bees.length; i++) {
        //move each bee to a random location
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx, dy); //moves every bee
        isHit(bees[i], bear); //checks if bees overlap bear and keeps count
    }
}

function updateBees() {  // update loop for game
    //move the bees randomly
    moveBees();
    //use a fixed update period
    let period = document.getElementById("periodTimer").value;

    let score = hits.innerHTML;
    if (Number(score) < 1000) {
        updateTimer = setTimeout('updateBees()', period); //update the timer for the next move
    } else {
        score = "Game Over"
        hits.innerHTML = score;
        updateTimer = clearTimeout();
    }
}

function isHit(defender, offender) {

    if (overlap(defender, offender)) { //Check if the two images overlap
        let score = hits.innerHTML;
        score = Number(score) + 1; //Increment the score
        hits.innerHTML = score; //display the score

        //get longest duration
        let newStingTime = new Date();
        let thisDuration = newStingTime - lastStingTime;
        lastStingTime = newStingTime;
        let longestDuration = Number(duration.innerHTML);

        //if longest duration is 0 or there is no new longest duration
        if (longestDuration === 0 || isNaN(longestDuration)) {
            longestDuration = thisDuration; //keep the longest duration already specified
        } else {
            if (longestDuration < thisDuration) longestDuration = thisDuration;
        }

        //Update the longest duration display
        document.getElementById("duration").innerHTML = longestDuration;
    }
}

function overlap(element1, element2) {
    //consider the two rectangles wrapping the two elements
    //rectangle of the first element
    left1 = element1.htmlElement.offsetLeft;  
    top1 = element1.htmlElement.offsetTop;
    right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
    bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;

    //The rectangle around the second element
    left2 = element2.htmlElement.offsetLeft; //e2x
    top2 = element2.htmlElement.offsetTop; //e2y
    right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
    bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;

    //Calculate the intersection of the two rectangles
    x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
    y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
    intersectArea = x_intersect * y_intersect;

    //If intersection is null no hit
    if (intersectArea == 0 || isNaN(intersectArea)) {
        return false;
    }

    return true;
}