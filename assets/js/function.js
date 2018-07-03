/**évènements du canvas */
/**Déplacement de la souris dans le canvas. */
const canvasMove = (e) => 
{
    mouse.position = canvas.getBoundingClientRect();
    mouse.x = e.clientX-mouse.position.left;
    mouse.y = e.clientY-mouse.position.top;
}
/**click de la souris sur le canvas. */
const canvasClick = () =>
{
    let value = game_levelers.current.score();
    if(game_Bonus != null && game_Bonus.explode)
        value *= game_Bonus.bonus();
    game_score += value;
    
    clickAll.push(new ClickedText(mouse.x, mouse.y, value.toString()));

    if(game_Bonus == null && clickAll.length >= shadow_difficulty)
    {
        game_Bonus = new Bonus(-100, -100, bonus_difficulty);
        game_Bonus.randomLocation();
    }
    if(game_Bonus != null && game_Bonus.contains(mouse.x, mouse.y) && !game_Bonus.explode)
        game_Bonus.click();
}

const upgradeLevel = () =>
{
    game_levelers.upgrade();
}

/**loop */
const canvasLoop = () => 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    recShadow();
    let all = clickAll;
    for(let i = 0; i < all.length; i++)
    {
        all[i].draw();
    }

    html_score.innerText = game_score;
    html_level.innerText = game_levelers.current.name;

    ctx.fillText(mouse.x +" "+ mouse.y, 10, 10);
    ctx.fillText(clickAll.length, 10, 30);
    ctx.fillText(game_Bonus, 10, 50);


    if(game_Bonus != null)
    {
        game_Bonus.draw();
        if(!rec_canvas.contains(game_Bonus.x, game_Bonus.y))
            game_Bonus = null;
    }
}
/**barre d'énergie sur le bord droit. */
const recShadow = () => 
{
    let height = 0;
    if(game_Bonus == null || !game_Bonus.explode)
    {
        height = Math.round(rec_canvas.height/shadow_difficulty)*clickAll.length;
    }
    else
    {
        let time = Date.now()-game_Bonus.explode_date;
        if(time <= game_Bonus.explode_time)
            height = rec_canvas.height-((rec_canvas.height/game_Bonus.explode_time)*time);
        else
            game_Bonus = null;
    }
    ctx.fillRect(rec_shadow.x, rec_shadow.y+(rec_shadow.height-height), rec_shadow.width, height);
}
/**rafraîchissement du canvas */
const gameRefresh = () =>
{
    try 
    {
        let now = Date.now();
        let all = clickAll;
        let tmpAll = [];
        for(let i = 0; i < all.length; i++)
        {
            if(now - all[i].create < game_refresh)
                tmpAll.push(all[i]);
        }
        clickAll = tmpAll;        
    }
    catch (error) 
    {
        console.log(error);
    }    
}

const gameAutoClick = () =>
{
    game_score += game_levelers.current.score();
}
