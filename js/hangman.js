//VARIABLES
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var words = [{word: "kitten", hint: "Is a feline"},
             {word: "truck", hint: "Has wheels"},
             {word: "apple", hint: "Is a food"},
             {word: "backpack", hint: "Holds things"},
             {word: "phone", hint: "Electronic"}];
var selectedWord = "";
var selectedHint = "";
var board = []; 
var remainingGuesses = 6;



//LISTENERS
// Begin the game
window.onload = startGame();

$("#letters").on("click", ".letter", function()
{
    checkLetter($(this).attr("id"));
    disableButton($(this));
});

// Reload page 
$(".replayBtn").on("click", function() 
{
    location.reload();
});



//FUNCTIONS
function startGame() 
{
    pickWord();
    createLetters();
    initBoard();
    updateBoard();
}

// Select a word 
function pickWord() 
{
    let randInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randInt].word.toUpperCase();
    selectedHint = words[randInt].hint;
}

// Creates the letters inside the letters div
function createLetters() 
{
    for (var letter of alphabet) 
    {
        let letterInput = '"' + letter + '"';
        $("#letters").append("<button class='btn btn-success letter' id='" + letter + "'>" + letter + "</button>");
    }
}

// Fill the board with underscores
function initBoard() 
{

    for (var letter in selectedWord) 
    {
        board.push("_");
    }
    
}

// Update board
function updateBoard() 
{
    $("#word").empty();
    
    for (var i=0; i < board.length; i++) 
    {
        $("#word").append(board[i] + " ");
    }
    
    $("#word").append("<br />");
    $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>")
}

// Update word then update board
function updateWord(positions, letter) 
{
    for (var pos of positions) 
    {
        board[pos] = letter;
    }
    
    updateBoard(board);
    
    // Check to see if guess is right
    if (!board.includes('_')) 
    {
        endGame(true);
    }
}

// Check to see if the letter exists in word
function checkLetter(letter) 
{
    var positions = new Array();
    
    for (var i = 0; i < selectedWord.length; i++) {
        if (letter == selectedWord[i]) 
        {
            positions.push(i);
        }
    }
    
    // Update the game state
    if (positions.length > 0) 
    {
        updateWord(positions, letter);
    } else {
        remainingGuesses -= 1;
        updateMan();
        
        if (remainingGuesses <= 0) 
        {
            endGame(false);
        }
    }
}


// Updates image for man
function updateMan() 
{
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}


// Ends game
function endGame(win) 
{
    $("#letters").hide();
    
    if (win) 
    {
        $('#won').show();
    } 
    else 
    {
        $('#lost').show();
    }
}

function disableButton(btn) 
{
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger")
}