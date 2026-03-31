const { getGames, getTeams, getGameFeed } = require('./api');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

//GETS TEAMS
// getTeams().then(teams => {
//     console.log(teams);
// });

//API ROUTES
app.get('/api/schedule', async (req, res) => {
    //Sorts out the Games
    let regularSeasonGames = await getGamesFromAPI();
    //Sends a response to the client
    res.json(regularSeasonGames);
});

app.get('/api/gamefeed', async (req, res) => {
    let gameFeed = await getGameFeedFromAPI();
    res.json(gameFeed);
});





//GETS FROM API
async function getGameFeedFromAPI() {
    let gameFeed;
    await getGameFeed()
        .then(gamefeeds => {
            gameFeed = gamefeeds;
        });
    return gameFeed;
}

async function getGamesFromAPI() {
    let regularSeasonGames;
    await getGames()
        .then(schedule => {
            // console.log(schedule);
            //Array regular season games
            regularSeasonGames = schedule.dates.filter(date => date.games[0].seriesDescription == 'Regular Season');
            // for (let i = 0; i < regularSeasonGames.length; i++) {
            //     //last played game as of today.
            //     if (regularSeasonGames[i].games[0].gameDate <= new Date().toISOString()) {
            //         //gets the games that have been played.
            //         console.log(regularSeasonGames[i]);
            //         lastGame = regularSeasonGames[i];
            //     }
            // }
            // console.log(lastGame);

        });
    return regularSeasonGames;
}



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
