class Rectangle
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    contains(x, y)
    {
        return this.x <= x && x <= this.x+this.width
            && this.y <= y && y <= this.y+this.height;
    }
}

class ClickedText
{
    constructor(x, y, text)
    {
        this.x = x;
        this.y = y;
        this.text = text;
        this.create = Date.now();
        this.counter = 0;
        this.up = true;

        this.left = Math.round(Math.random());
        this.x_increment = Math.round(Math.random()*4);
        this.x_counter = 0;
        this.x_max = clickAll.length*2;
    }
    draw()
    {   
        if(this.counter >= 30)
            this.up = false;
        if(this.up)
            this.counter++;
        else
            this.counter--;
        
        if(this.x_counter <=  50)
        {
            this.x_counter++;
            if(this.left)
                this.x -= this.x_increment;
            else
                this.x += this.x_increment;
        }

        ctx.fillText(this.text, this.x, this.y-this.counter);
    }
}

class Level
{
    constructor(value, name, increment, cost)
    {
        this.value = value;
        this.name = name;
        this.increment = increment;
        this.cost = cost;
    }
    toString()
    {
        return this.name +" : "+ this.cost;
    }
    score()
    {
        return this.increment;
    }
}

class Levelers
{
    constructor()
    {
        this.all = [
            new Level(0, "level 0", 1, 0),
            new Level(1, "level 1", 2, 1000),
            new Level(2, "level 2", 3, 2000),
            new Level(3, "level 3", 4, 4000),
            new Level(4, "level 4", 5, 8000),
        ];

        this.current = this.all[0];
        this.after = this.all[1];
    }
    upgrade()
    {
        if(this.after != null && this.after.cost <= game_score)
        {
            game_score -= this.after.cost;
            this.current = this.after;
            if(this.after.value < this.all.length-1)
            {
                this.after = this.all[this.current.value+1];
                html_upgrade_level.innerHTML = this.after.toString();
            }
            else
            {
                this.after = null;
                html_upgrade_level.innerHTML = "MAX";
                html_upgrade_level.setAttribute('disabled', false);
            }
        }
    }
}

class Bonus
{
    constructor(x, y, radius, fillColor="black", strokeColor="black")
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.increment = {x:0, y:0};
        this.explode = false;
        this.explode_time = 30000;
        this.explode_date = Date.now();
    }
    contains(x, y)
    {
        return this.x-this.radius <= x && x <= this.x+this.radius
            && this.y-this.radius <= y && y <= this.y+this.radius
            && Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) <= this.radius*this.radius;
    }
    draw()
    {
        if(!this.explode)
        {
            this.x += this.increment.x;
            this.y += this.increment.y;
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.fillColor;
            ctx.fill();
            ctx.strokeStyle = this.strokeColor;
            ctx.stroke();
        }
    }
    click()
    {
        this.toExplode();
    }
    toExplode()
    {
        clickAll.push(new ClickedText(this.x, this.y, "explode"));                
        this.explode_date = Date.now();
        this.explode = true;
    }
    bonus()
    {
        let bonus = this.explode_time-(Date.now()-this.explode_date);
        bonus = Math.ceil(bonus/1000);
        return bonus;
    }
    randomLocation()
    {
        let rand = Math.round(Math.random()*4);
        let rand_x = Math.round(Math.random()*rec_canvas.width);
        let rand_y = Math.round(Math.random()*rec_canvas.height);


        switch(rand)
        {
            case 0 : {
                this.x = 0;
                this.y = 0;
                this.increment.x = 1;
                this.increment.y = 1;
                break;
            }
            case 1 : {
                this.x = 0;
                this.y = rand_y;
                this.increment.x = 1;
                this.increment.y = -1;                
                break;
            }
            case 2 : {
                this.x = rec_canvas.width;
                this.y = rand_y;
                this.increment.x = -1;
                this.increment.y = -1
                break;
            }
            case 3 : {
                this.x = rand_x;
                this.y = rec_canvas.height;
                this.increment.x = -1;
                this.increment.y = -1;
                break;
            }
        }
    }
}