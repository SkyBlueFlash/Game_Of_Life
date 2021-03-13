var width;
var height;
var new_board;
var running;

function random_state() {
    if (running!= null) {
        alert("please reset the ongoing simulation beore starting a new one");
        return; }

    this.width = parseInt(document.getElementById('w').value);
    this.height = parseInt(document.getElementById('h').value);
   
    var tbl = document.createElement('table');
    var stop_btn = document.createElement('button');
    document.body.appendChild(stop_btn);
    stop_btn.addEventListener('click',function() {
    reset();}, false);
    

    stop_btn.innerText = 'Reset';

    // create the table rows and cells based on the width and height of the input
    for (var i = 0; i < width; ++i)
    {
        var tr = document.createElement('tr');
        for (var x = 0; x < height; ++x)
        {
            var td = document.createElement('td');
            var p = document.createElement('p');
            td.id = i + "-" + x;
            td.appendChild(p);
            tr.appendChild(td);
        }
        tbl.appendChild(tr);
    }
    document.body.appendChild(tbl);

    // create the board
    var board = new Array(width);
    for (var i = 0; i < board.length; i++){
        board[i] = new Array(height);
    }

    // randomise the board's cells values
    for (var i = 0; i < width; i++){
        for (var x = 0; x < height; x++)
        {
            // the math.round was used due to math.random giving random floating point
            // numbers between 0 and 1 so the math.round rounds these number up to one
            // or down to zero
            board[i][x] = Math.round(Math.random());
        }
    }
    render(board);
    new_board = board;
    main_loop(new_board);
}

// renders the new values by changing the bg color to black if the cell is alive and white
// if dead
function render(board){
    for (var i = 0; i < width; i++){
        for (var x = 0; x < height; x++)
        {
            if (board[i][x] == 1) {
                document.getElementById(i+"-"+x).style.backgroundColor = "black";
            }
            else {
                document.getElementById(i+"-"+x).style.backgroundColor = "white";
            }
        }
    }
}

// loop through each cell and check the numbers of living cells in the tiles around it
// and then keep it alive or kill it based on the number of living neighbors
function update_state(previous_state) {
    new_board = previous_state;
    var counter;
    for (var row = 0; row < width; ++row) {
        for (var cell = 0; cell <height; ++cell) {
                counter = 0;
                if ((row > 0) & (cell > 0))
                {
                    if (previous_state[row-1][cell-1] == 1)
                    {
                        ++counter;
                    }
                }
                if (row > 0)
                {
                    if (previous_state[row-1][cell] == 1)
                    {
                        ++counter;
                    }
                }
                if ((row > 0) & (cell < height-1))
                {
                    if (previous_state[row-1][cell+1] == 1)
                    {
                        ++counter;
                    }
                }

                if (cell > 0)
                {
                    if (previous_state[row][cell-1] == 1)
                    {
                        ++counter;
                    }
                }
                if (cell < height-1)
                {
                    if (previous_state[row][cell+1] == 1)
                    {
                        ++counter;
                    }
                }

                if ((row < width-1 ) & (cell > 0))
                {
                    if (previous_state[row+1][cell-1] == 1)
                    {
                        ++counter;
                    }
                }
                if (row < width-1)
                {
                    if (previous_state[row+1][cell] == 1)
                    {
                        ++counter;
                    }
                }
                if ((row < width-1) & (cell < height-1))
                {
                    if (previous_state[row+1][cell+1] == 1)
                    {
                        ++counter;
                    }
                }
            if (((new_board[row][cell] == 1) & (counter < 2)) | ((new_board[row][cell] == 1) & counter > 3))  {
                new_board[row][cell] = 0;
            }
            
            else if ((new_board[row][cell] == 1) & (counter == 2 | ((new_board[row][cell] == 1) & (counter == 3)))) { 
                new_board[row][cell] = 1;
            }

            else if((new_board[row][cell] == 0) & (counter == 3)) {
                new_board[row][cell] = 1;
            }
            
        }
    }
    render(new_board);
}

function reset() {
    clearInterval(running);
    running = null;
    for (var i = 0; i < width; i++){
        for (var x = 0; x < height; x++)
        {
            document.getElementById(i+"-"+x).style.backgroundColor = "white";
        }
    }
}    


function main_loop() {
    running = setInterval(function() {update_state(new_board)}, 1000);
}