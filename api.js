const mlbAPI = require('mlb-stats-api');
const mlb = new mlbAPI();
//158
async function getGames() {
    const schedule = await mlb.getSchedule({ params: { season: '2026', sportId: 1, teamId: 158 } });
    return schedule.json();
}

async function getTeams() {
    const teams = await mlb.getTeams({ params: { sportId: 1 } });
    return teams.json();
}

async function getGameFeed() {
    const gamefeed = await mlb.getGameFeed({ pathParams: { gamePk: 824864 } });
    return gamefeed;
}


module.exports = { getGames, getTeams, getGameFeed };