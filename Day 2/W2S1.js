
Untitled Scrim
Expand for more info
index.js
122123124125126127128129130131132133134135136137138139140
 function grade_adjustment(inTable, adj) {    let myTable = inTable.slice(0);    myTable[0] = inTable[0].slice(0)    for (let i = 1; i<inTable.length;i++) {        myTable[i] = inTable[i].slice(0);        myTable[i][1] =(myTable[i][1] * (100 + adj) / 100).toFixed(0);        if (myTable[i][1] > 100) {myTable[i][1] = "100";}        myTable[i][3] =((+myTable[i][1] + +myTable[i][2]) / 2).toFixed(0);    }    return myTable;} console.log("W2S1 Activity 6: Exam adjustments")let new_grades_table = grade_adjustment(grades_table, 50);console.log(grades_table);console.log(new_grades_table);  



// W2S1 Activity 5: swap_elements(arr, index1, index2)
function swap_elements(arr, i, j) {
    console.log(arr);
    if (i<0 || i>=arr.length || j<0 || j>=arr.length) {
        return null;
    }
    let newarr = arr.slice(0);

Find
No Results

CONSOLE
›W2S1 Activity 1: median(arr)
›[8, 7, 6, 5, 3]
›6
›[9, 8, 7, 6, 5, 3]
›6.5
›W2S1 Activity 2: middle_array(arr)
›[1, 9]
›[]
›[1, 9, 4]
›[9]
›[1, 9, 8, 4]
›[9, 8]
›W2S1 Activity 3: sum_odd_numbers(arr)
›[]
›0
›[3]
›3
›[4]
›0
›[-32]
›0
›[3, 2, 5]
›8
›[43, 30, 27, -3, 55]
›125
›W2S1 Activity 4: moving_average(arr)
›[30, 20, 40, 50, 25, 70]
›[30, 36.7, 38.3, 48.3]
›W2S1 Activity 5: swap_elements(arr), index1, index2
›[3, 6, 8, 7]
›[3, 6, 7, 8]
›[3, 6, 8, 7]
›null
›W2S1 Activity 6: Exam adjustments
›[["Student Name", "MidTerm Score", "FinalExam Score", "Average Score"], ["Chris", "60", "80", "70"], ["Oka", "50", "80", "65"], ["Norman", "40", "70", "55"], ["Natalie", "60", "70", "65"], ["Tony", "80", "90", "85"]]
›[["Student Name", "MidTerm Score", "FinalExam Score", "Average Score"], ["Chris", "90", "80", "85"], ["Oka", "75", "80", "78"], ["Norman", "60", "70", "65"], ["Natalie", "90", "70", "80"], ["Tony", "100", "90", "95"]]
/index.html

scrimba
Untitled Scrim
