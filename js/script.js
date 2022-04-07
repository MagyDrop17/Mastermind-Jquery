let printRowCount = 0;

$(document).ready(function() {
    // call function hoverButons
    startNewGame();

});

let startNewGame = function() {
    // reset game

    printRowCount = 0;
    const arrayColores = arrayRandomColors();
    console.log(arrayColores);

    $('#resultat').empty();

    if ($('#audio')) {
        // if audio is playing in the page, stop it
        $('#audio').currentTime = 0;

        $('#audio').remove();
    }


    hoverButons(arrayColores);

    // Netejem Totes les rows
    for (let i = 1; i < 8; i++) {
        $('#row-' + i).empty();
    }

    printRow(); // Printem la primera fila

    $('.circles-colors').click(function() {

        // get color of circle clicked i hex
        const color = $(this).css('fill');
        const maincolor = $rgbToHex(color);

        // get the white circle and change color with the main color

        for (let i = 0; i < 5; i++) {

            if ($('.l' + printRowCount + '-colors-ans').eq(i).css('fill') == 'rgb(255, 255, 255)') {
                $('.l' + printRowCount + '-colors-ans').eq(i).css('fill', '#' + maincolor);
                break;
            }

        }

    });



}

let startedAgain = function() {
    // reset game

    printRowCount = 0;
    const arrayColores = arrayRandomColors();
    console.log(arrayColores);

    $('#resultat').empty();
    $('#resultatBoles').empty();

    if ($('#audio')) {
        // if audio is playing in the page, stop it
        $('#audio').currentTime = 0;

        $('#audio').remove();
    }

    // Netejem Totes les rows
    for (let i = 1; i < 10; i++) {

        $('#row-' + i).empty();
    }

    printRow(); // Printem la primera fila

}

let arrayRandomColors = function() {

    // return array of 5 random colors

    const arrayColors = [
        'B10DC9',
        '0074D9',
        'FF4136',
        'FF851B',
        '2ECC40',
        'FFDC00',
        '7FDBFF'
    ];

    const randomColors = [];

    for (let i = 0; i < 5; i++) {

        const random = Math.floor(Math.random() * arrayColors.length);
        randomColors.push(arrayColors[random]);

    }

    return randomColors;


}

let hoverButons = function(arrayColores) {

    // Css Styles for butons
    $('.rect-buttons').mouseover(function() {
        $(this).css('fill', '#ff0000');
        $(this).addClass('pointer');
    });
    $('.rect-buttons').mouseout(function() {
        $(this).css('fill', '#85144b');
        $(this).removeClass('pointer');
    });

    $('.rect-text').mouseover(function() {
        $(this).addClass('pointer');

    });
    $('.rext-text').mouseout(function() {
        $(this).removeClass('pointer');
    });

    // Function for buttons
    $('.rect-text, .rect-buttons').click(function() {

        const secondClass = $(this).attr('class').split(' ')[1];

        switch (secondClass) {

            case 'new-game':

                console.log('new game');
                startedAgain();
                break;

            case 'delete-row':

                resetGame();
                break;

            case 'check-game':

                checkGame(arrayColores);
                break;

            default:
                alert('Error');
                break;

        }


    });

}

let resetGame = function() {

    const reset = $('.l' + printRowCount + '-colors-ans');

    for (let i = 0; i < reset.length; i++) {

        $(reset[i]).css('fill', 'white');

    }

}

let checkGame = function(arrayColores) {

    console.log(arrayColores);

    // get all l1-colors-ans and see if there are not fiil white
    const colors = $('.l' + printRowCount + '-colors-ans')

    let count = 0;

    colors.each(function() {

        let color = $(this).css('fill');
        color = '#' + $rgbToHex(color);

        if (color === '#ffffff') {
            count++;
        }

    });

    console.log(count);

    if (count > 0) {

        alert('No has comprovat totes les boles');

    } else {

        // copy colors to array
        let arraycopy = [];
        arraycopy = arrayColores.slice();

        let colorescopy = [];
        colorescopy = colors.slice();


        $('.l' + printRowCount + '-colors-ans').addClass('done');
        $('.l' + printRowCount + '-colors-ans').removeClass('l' + printRowCount + '-colors-ans');

        $('.done').off('click');


        let winOrLose = 0;
        let blancas = 0;
        // in arrayColers get color and how many times is in array 

        for (let i = 0; i < arraycopy.length; i++) {

            let color = colorescopy[i].style.fill;
            color = $rgbToHex(color);
            color = color.toUpperCase();

            if (arraycopy[i] === color) {
                winOrLose++;
                //delete element
                arraycopy.splice(i, 1);
                // delete color
                colorescopy.splice(i, 1);
                i--;
            }

        }

        console.log(arraycopy);
        console.log(colorescopy);

        for (let j = 0; j < arraycopy.length; j++) {

            let color = colorescopy[j].style.fill;
            color = $rgbToHex(color);
            color = color.toUpperCase();

            if (arraycopy.includes(color)) {

                blancas++;
                arraycopy.splice(arraycopy.indexOf(color), 1);
                colorescopy.splice(color.indexOf(color), 1);
                j--;

            }

        }

        const balls = $('.l' + printRowCount + '-colors-res');

        console.log(winOrLose + ' ' + blancas);

        if (winOrLose == 5) {

            balls.each(function() {
                $(this).css('fill', 'black');
            });

            hasguanyat(arrayColores);

        } else {

            let j = 0;
            // if winOrLose is not 0 
            if (winOrLose != 0) {

                for (let i = 0; i < winOrLose; i++) {

                    balls[i].style.fill = 'black';
                    j++;
                }

            }

            if (blancas != 0) {

                // for loop starting in position j fill with white balls to  
                for (let i = j; i < j + blancas; i++) {

                    $(balls[i]).css('fill', 'white');

                }

            }

            if (printRowCount < 9) {
                printRow(arrayColores);
            } else {
                hasperdut(arrayColores);
            }

        }

    }

}

let $rgbToHex = function(rgb) {

    const rgba2hex = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('');

    return rgba2hex;

}

let getColors = function() {

    $('.circles-colors').click(function() {

        // get color of circle clicked i hex
        const color = $(this).css('fill');
        const hex = rgbToHex(color);

        return hex;

    });

}

let printRow = function() {

    printRowCount++;

    const row = $('#row-' + printRowCount); // Aconseguim el fila

    createRectangles(row, 25, 0 + (100 * parseInt(printRowCount)), 15, 15, 600, 65, '#ccc092', printRowCount); // Creem Rectangle general

    let g = createG(row); // Creen un grup
    createRectangles(g, 25, 0 + (100 * parseInt(printRowCount)), 15, 15, 65, 65, 'red', 1); // Creem un rectangle de color roig per ficar el numero de la fila

    createText(g, printRowCount, 45, 50 + (100 * parseInt(printRowCount)), 'white', 55); // Creem el text
    g1 = createG(g); // dintre del grup, creem un altre grup

    createCirclesAdivinar(32.5 + (100 * parseInt(printRowCount)), 15, "white", "1", 5, printRowCount, g1, "black"); // Creem els 5 cercles per adivinar
    g2 = createG(g); // dintre del grup, creem un altre grup

    createCirclesUp(17.5 + (100 * parseInt(printRowCount)), 10, "#FBEEC1", "1", 3, printRowCount, g2, "black"); // Creem 3 cercle a dalt per la comprovacio

    createCirclesDown(47.5 + (100 * parseInt(printRowCount)), 10, "#FBEEC1", "1", 2, printRowCount, g2, "black"); // Creem 2 cercle a baix per la comprovacio 

}

let createRectangles = function(row, x, y, rx, ry, width, height, color, stroke) {

    const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
        'x': x + "px",
        'y': y + "px",
        'rx': rx,
        'ry': ry,
        'width': width + "px",
        'height': height + "px",
        'fill': color,
        'stroke-width': stroke,
    });

    row.append($bar);

}

let createG = function(row) {
    const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "g"));
    row.append($bar);
    return $bar;
}

let createText = function(row, number, x, y, color, size) {

    switch (number) {
        case 4:
            x = 42.5;
            y = 445;
            break;
        case 5:
            x = 42.5;
            y = 545;
            break;
        case 6:
            x = 41.5;
            y = 652.5;
            break;
        case 7:
            y = 745;
            break;
        case 8:
            x = 42.5;
            y = 852.5;
            break;
        case 9:
            x = 42.5;
            y = 945;
            break;
    }

    const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "text")).attr({
        'x': x + "px",
        'y': y + "px",
        'fill': color,
        'font-size': size + "px",
    });

    $bar.text(number);

    row.append($bar);
    return $bar;

}

let createCirclesAdivinar = function(cy, r, color, stroke, numCirculos, numRow, row, colorStroke) {

    let aux = 130;

    for (let i = 0; i < numCirculos; i++) {


        const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
            'cx': aux + "px",
            'cy': cy + "px",
            'r': r + "px",
            'fill': color,
            'stroke': colorStroke,
            'stroke-width': stroke,
            'class': `l${numRow}-colors-ans`,
            'id': `l${numRow}-${i+1}`
        });

        row.append($bar);

        aux += 60;

    }

}

let createCirclesUp = function(cy, r, color, stroke, numCirculos, numRow, row, colorStroke) {


    let aux = 520;

    for (let i = 0; i < numCirculos; i++) {


        const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
            'cx': aux + "px",
            'cy': cy + "px",
            'r': r + "px",
            'fill': color,
            'stroke': colorStroke,
            'stroke-width': stroke,
            'class': `l${numRow}-colors-res`,
            'id': `l${numRow}-${i+1}-res`
        });

        row.append($bar);

        aux += 30;

    }

}

let createCirclesDown = function(cy, r, color, stroke, numCirculos, numRow, row, colorStroke) {

    let aux = 535;

    for (let i = 0; i < numCirculos; i++) {

        const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
            'cx': aux + "px",
            'cy': cy + "px",
            'r': r + "px",
            'fill': color,
            'stroke': colorStroke,
            'stroke-width': stroke,
            'class': `l${numRow}-colors-res`,
            'id': `l${numRow}-${i+1}-res`
        });

        row.append($bar);

        aux += 30;

    }

}

let hasguanyat = function(arrayColores) {

    showResposta(arrayColores);

    let row = $('#resultat');

    const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
        'x': "25px",
        'y': "1100px",
        'rx': 15,
        'ry': 15,
        'width': "700px",
        'height': "80px",
        'fill': "#ccc092",
        'stroke-width': 5,
    });

    row.append($bar);

    // animate the text 
    const text = $(document.createElementNS("http://www.w3.org/2000/svg", "text")).attr({

        'id': "text",
        'x': "210px",
        'y': "1160px",
        'fill': "white",
        'font-size': "55px",

    });

    text.text("Has guanyat!");

    row.append(text);

    // Add sound to the page
    const audio = document.createElement('audio');
    audio.setAttribute('src', './sounds/win.mp3');
    audio.play();
    document.body.appendChild(audio);

}

let hasperdut = function(arrayColores) {

    showResposta(arrayColores);

    let row = $('#resultat');

    const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
        'x': "25px",
        'y': "1100px",
        'rx': 15,
        'ry': 15,
        'width': "700px",
        'height': "80px",
        'fill': "#ccc092",
        'stroke-width': 5,
    });

    row.append($bar);

    const text = $(document.createElementNS("http://www.w3.org/2000/svg", "text")).attr({

        'id': "text",
        'x': "220px",
        'y': "1160px",
        'fill': "white",
        'font-size': "55px",

    });

    text.text("Has perdut!");

    row.append(text);

    // Add sound to the page
    const audio = document.createElement('audio');
    audio.setAttribute('id', 'audio');
    audio.setAttribute('src', './sounds/lose.mp3');
    audio.play();
    // append the audio to the body
    document.body.appendChild(audio);

}

let showResposta = function(arrayColores) {

    let row = $('#resultatBoles');

    const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
        'x': "25px",
        'y': "1000px",
        'rx': 15,
        'ry': 15,
        'width': "700px",
        'height': "80px",
        'fill': "#ccc092",
        'stroke-width': 5,
    });

    row.append($bar);
    cx = 220;

    // show the colors
    for (let i = 0; i < arrayColores.length; i++) {

        const $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
            'cx': cx,
            'cy': "1040px",
            'r': "20px",
            'fill': '#' + arrayColores[i],
            'stroke': '#' + arrayColores[i],
            'stroke-width': 5,
        });

        cx += 80;
        row.append($bar);
    }

}