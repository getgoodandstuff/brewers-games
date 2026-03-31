const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let nextGameDiv;
// Fetch the schedule data from the API
fetch('/api/schedule')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let nextGame;
        for (let i = 0; i < data.length; i++) {
            if (nextGame === undefined && data[i].games[0].gameDate > new Date().toISOString()) {
                //selects the next game
                nextGame = data[i].games[0];
                scheduleEl(data[i].games[0], true);
            }
            else {
                //selects the rest of the games
                scheduleEl(data[i].games[0], false);
            }

        }
        console.log(nextGame);
        if (nextGameDiv) {
            nextGameDiv.scrollIntoView({ block: 'center' });
        }

    })
    .catch(error => console.error('Error fetching games:', error));

function scheduleEl(game, isNextGame) {
    let containerEl = document.createElement('div');
    containerEl.classList.add('game-container');

    let teamsEl = document.createElement('h3');
    let statusEl = document.createElement('p');
    let dateEl = document.createElement('p');
    teamsEl.innerText = game.teams.away.team.name + ' @ ' + game.teams.home.team.name;
    statusEl.innerText = game.status.detailedState + (game.teams.away.score !== undefined ? ': ' + game.teams.away.score + ' - ' + game.teams.home.score : '');
    let gameDate = new Date(game.gameDate);
    dateEl.innerText = daysOfWeek[gameDate.getDay()] + ' - ' + gameDate.toLocaleDateString() + '\n' + gameDate.toLocaleTimeString();

    if (isNextGame === true) {
        nextGameDiv = containerEl;
        containerEl.style.backgroundColor = 'lightgreen';
    }
    containerEl.appendChild(teamsEl);
    containerEl.appendChild(dateEl);
    containerEl.appendChild(statusEl);
    document.getElementById('games').appendChild(containerEl);
}


// Fetch the game feed data from the API
fetch('/api/gamefeed')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error fetching game feed:', error));