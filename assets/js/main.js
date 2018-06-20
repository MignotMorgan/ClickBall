let canvas;
let ctx;
let mouse = {x:0, y:0, position:null};
clickAll = [];

/**élements HTML5 */
let html_score = document.querySelector('.lbl--score');
let html_level = document.querySelector('.lbl--level');
let html_upgrade_level = document.querySelector('.lbl--upgrade-level');

/**rectangles */
let rec_canvas = new Rectangle(0, 0, 500, 500);
let rec_shadow = new Rectangle(450, 0, 50, 500);

/**game setup */
let game_score = 0;
let game_levelers = new Levelers();
let shadow_difficulty = 20; //nombre de click pour remplir le shadow
let bonus_difficulty = 25;
let game_autoclick = 1000; //nombre de millisecondes avant le prochain auto click
let game_refresh = 3000; //nombre de millisecondes avant le rafraichissement du shadow
let game_Bonus = null;// = new Bonus(50, 50, 25);

/**timer */
let intervalID = window.setInterval(canvasLoop, 10);
let intervalAutoClick = window.setInterval(gameAutoClick, game_autoclick);
let intervalRefresh = window.setInterval(gameRefresh, 10);

window.onload = () => {
    /**création du canvas */
    canvas = document.createElement('canvas');
    canvas.style.width = rec_canvas.width;
    canvas.style.height = rec_canvas.height;
    canvas.width = rec_canvas.width;
    canvas.height = rec_canvas.height;
    canvas.classList.add('canvas--click');
    document.querySelector('.div--screen').appendChild(canvas);
    ctx = canvas.getContext('2d');
    
    canvas.addEventListener('mousemove', canvasMove);
    canvas.addEventListener('click', canvasClick);

    html_upgrade_level.innerHTML = game_levelers.after.toString();    
}