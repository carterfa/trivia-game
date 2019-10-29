//array of quiz questions
let quizArray = [
    {
        title: "In what year was Nintendo founded?",
        options: {
            a: "1956",
            b: "1980",
            c: "1972",
            d: "1889"
        },
        correct: "d"
    },

    {
        title: "The US version of Super Mario Bros. 2 is an altered version of this Japanese game:",
        options: {
            a: "Doki Doki Panic",
            b: "Mother 3",
            c: "Seiken Densetsu",
            d: "Doki Doki Literature Club!"
        },
        correct: "a"
    },

    {
        title: "Who is credited for the creation of Super Mario Bros., The Legend of Zelda, and Donkey Kong?",
        options: {
            a: "Satoru Iwata",
            b: "Garrett Bobby Ferguson",
            c: "Shigeru Miyamoto",
            d: "Hideki Kamiya"
        },
        correct: "c"
    },

    {
        title: "Satoru Iwata, a former president of Nintendo, helped to compress the code of this popular Gameboy game:",
        options: {
            a: "Drill Dozer",
            b: "Kirby's Adventure",
            c: "Pokemon Gold & Silver Version",
            d: "Pokemon Ruby & Sapphire Version"
        },
        correct: "c"
    },

    {
        title: "This video game console was originally supposed to be a CD-ROM add-on for the Super Famicom.",
        options: {
            a: "Xbox",
            b: "PlayStation",
            c: "Dreamcast",
            d: "Game Gear"
        },
        correct: "b"
    },

    {
        title: "What game accidentally infected its players with a virtual pandemic in 2005?",
        options: {
            a: "Guild Wars 2",
            b: "Runescape",
            c: "Final Fantasy XIV",
            d: "World of Warcraft"
        },
        correct: "d"
    },


]

//variables
let i = 0;
let currentQ = quizArray[i];
let correctNum = 0;
let wrongNum = 0;
let timer = 20;
let intervalId;
let clockRunning = true;

//displays question with options
function displayQuestion(currentQ) {

    //reset the clock
    timer = 20;
    $("#countdown").text(timer);
    clockRunning = true;

    //start the clock
    intervalId = setInterval(function () {
        timer--;
        $("#countdown").text(timer);

        if (timer == 0) {
            $("#countdown").text("TIMES UP!");
            wrongDisplay();
        }

    }, 1000);

    //clears and adds question title
    $("#questionTitle").text("");
    $("#questionTitle").text(currentQ.title);

    //clears options
    $("#optionsBox").empty();

    //adds question options
    $("#optionsBox").append("<h4 class='choice' id='a'>" + currentQ.options.a + "</h4>");
    $("#optionsBox").append("<h4 class='choice' id='b'>" + currentQ.options.b + "</h4>");
    $("#optionsBox").append("<h4 class='choice' id='c'>" + currentQ.options.c + "</h4");
    $("#optionsBox").append("<h4 class='choice' id='d'>" + currentQ.options.d + "</h4>");

}

//displays correct answer dialog
function correctDisplay() {

    //stops the clock
    clearInterval(intervalId);
    clockRunning = false;

    //display message
    $("#questionTitle").text("Correct!");

    //adds to correct count
    correctNum++;

    //only go to next question if there is one, or go to final screen
    i++;
    if (i == quizArray.length) {
        setTimeout(function () { displayOver(); }, 3000);
    } else {
        currentQ = quizArray[i];
        setTimeout(function () { displayQuestion(currentQ); }, 3000);
    }
}

//displays wrong answer dialog
function wrongDisplay() {

    //stops the clock
    clearInterval(intervalId);
    clockRunning = false;

    //grabs and displays correct answer
    let correctA = $("#" + currentQ.correct).text();
    $("#questionTitle").text("The correct answer was: " + correctA);
    //highlights correct answer
    $("#" + currentQ.correct).css("background-color", "green");

    //adds to wrong count
    wrongNum++;

    //only go to next question if there is one, or go to final screen
    i++;
    if (i == quizArray.length) {
        setTimeout(function () { displayOver(); }, 3000);
    } else {
        setTimeout(function () {
            currentQ = quizArray[i];
            displayQuestion(currentQ);
        }, 3000);
    }
}

//displays final screen
function displayOver() {

    //stops the clock
    clearInterval(intervalId);
    clockRunning = false;

    //clear out options
    $("#optionsBox").empty();

    //display message
    $("#questionTitle").text("All Done!");

    //display number wrong and correct
    $("#messageBox").append("<h4>Correct Answers: " + correctNum + "</h4>");
    $("#messageBox").append("<h4>Wrong Answers: " + wrongNum + "</h4>");

    //clears timer
    $("#countdown").text("");

}

$(document).ready(function () {

    //begins quiz
    displayQuestion(quizArray[i]);

    //code for choosing answer
    $("#optionsBox").on("click", ".choice", function () {

        if (clockRunning === true) {
            //compares option id to correct answer
            if ($(this).attr("id") === currentQ.correct) {
                correctDisplay();
                $(this).css("background-color", "green");
            } else {
                wrongDisplay();
                $(this).css("background-color", "red");
            }
        }
    })

});