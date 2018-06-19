const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const SEC = require('./images.json');
const port = 3000;

//setting up handlebars
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//home page with all the images
app.get('/', (req,res) => {
    res.render('home', {
        message: 'Welcome to SadSECFanGram!',
        teams: SEC.secTeams
    });
});



//Team detail page: show the team name and image on its own page
app.get('/:id', (req, res) => {
    let theTeam = req.params.id;
    let school = SEC.secTeams.find((school) => {
        return school.team === theTeam;
    });
    //Check if team name is valid
    //is it undefined or a real object?
    if (school) {
        res.render('teampage', {
            school
        });
    } else {
        //redirect if invalid :id
        res.redirect('.')
    }
})

app.listen(port, () => {
    console.log(`Your express app is running at http://localhost:${port}`);
})