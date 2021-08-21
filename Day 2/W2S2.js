let puzzles = [];

//  W2S2 Activity 1: Fibonacci sequence")
function fibo(n) {
    if (n < 0) {
        return undefined;
    }
    if (n <= 1) {
        return n;
    }
    return (fibo(n-2) + fibo(n-1));
}

console.log("W2S2 Activity 1: Fibonacci sequence")
puzzles = [-1, 0, 1, 2, 3, 4, 5, 6, 10, 30];
for (let i in puzzles) {
    console.log(`fibo(${puzzles[i]}) is ${fibo(puzzles[i],puzzles[i+1])}.`)
}




//  W2S2 Activity 2: McCarthy 91 function")
function mccarthy(n) {
    return (n > 100)?(n - 10):mccarthy(mccarthy(n + 11));
}

console.log("W2S2 Activity 2:  McCarthy 91 function")
for (let i = -10; i<=110; i++) {
    console.log(`Evaluated McCarthy(${i}) is ${mccarthy(i)}.`);
}



// W2S2 Activity 3: Euclidean Algorithm for the GCD
function euclid(a, b) {
    if (a == b) { return a;}
    if (a == 0) { return b;}
    if (b == 0) { return a;}
    if (a > b) {[a, b] = [b, a];}
    let c = b % a;
    return euclid(a, c);
}

console.log("W2S2 Activity 3: Euclidean Algorithm for the GCD")
puzzles = [270, 192, 30, 50];
for (let i = 0; i < puzzles.length-1; i = i + 2) {
    console.log(`GCD of ${puzzles[i]},${puzzles[i+1]} is ${euclid(puzzles[i],puzzles[i+1])}.`)
}



// SWS1 Activity 4: Towers of Hanoi
function move_disks(n, from_tower , aux_tower , to_tower) {
    if (n >= 1) {
        move_disks(n-1, from_tower, to_tower, aux_tower);
        console.log(`Move disk ${n} from ` + from_tower + " to " + to_tower + ".");
        move_disks(n-1, aux_tower, from_tower, to_tower);
    }
}

console.log("W2S2 Activity 4: Towers of Hanoi")
puzzles = [3, 4];
for (let i in puzzles) {
    console.log(`To move Hanoi Tower of ${puzzles[i]} disks.`);
    move_disks(puzzles[i],"A","B","C");
}

