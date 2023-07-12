import { ILeaderBoard } from '../Interfaces/ILeaderBord';
import { IMatches } from '../Interfaces/IMatches';

const t = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};
const awayVictory = (homeGoals: number, awayGoals: number) => {
  t.totalVictories += 1;
  t.totalPoints += 3;
  t.goalsOwn += homeGoals;
  t.goalsFavor += awayGoals;
};
const homeVictory = (homeGoals: number, awayGoals: number) => {
  t.totalVictories += 1;
  t.totalPoints += 3;
  t.goalsOwn += awayGoals;
  t.goalsFavor += homeGoals;
};
const awayDraw = (homeGoals: number, awayGoals: number) => {
  t.totalDraws += 1;
  t.totalPoints += 1;
  t.goalsOwn += homeGoals;
  t.goalsFavor += awayGoals;
};
const homeDraw = (homeGoals: number, awayGoals: number) => {
  t.totalDraws += 1;
  t.totalPoints += 1;
  t.goalsOwn += awayGoals;
  t.goalsFavor += homeGoals;
};
const awayLoss = (homeGoals: number, awayGoals: number) => {
  t.totalLosses += 1;
  t.totalPoints += 0;
  t.goalsOwn += homeGoals;
  t.goalsFavor += awayGoals;
};
const homeLoss = (homeGoals: number, awayGoals: number) => {
  t.totalPoints += 0;
  t.totalLosses += 1;
  t.goalsFavor += homeGoals;
  t.goalsOwn += awayGoals;
};
const awayPoints = (matches: IMatches[]) => {
  matches.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      awayVictory(match.homeTeamGoals, match.awayTeamGoals);
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      awayDraw(match.homeTeamGoals, match.awayTeamGoals);
    } else {
      awayLoss(match.homeTeamGoals, match.awayTeamGoals);
    }
  });
};
const homePoints = (matches: IMatches[]) => {
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      homeVictory(match.homeTeamGoals, match.awayTeamGoals);
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      homeDraw(match.homeTeamGoals, match.awayTeamGoals);
    } else {
      homeLoss(match.homeTeamGoals, match.awayTeamGoals);
    }
  });
};
const restart = () => {
  t.totalPoints = 0;
  t.totalGames = 0;
  t.totalVictories = 0;
  t.totalDraws = 0;
  t.totalLosses = 0;
  t.goalsFavor = 0;
  t.goalsOwn = 0;
  t.goalsBalance = 0;
  t.efficiency = 0;
};
const awayRes = (name: string, matches: IMatches[]) => {
  if (name !== t.name) {
    restart();
  }
  t.name = name;
  awayPoints(matches);
  t.totalGames += 1;
  t.goalsBalance = t.goalsFavor - t.goalsOwn;
  t.efficiency = Number(
    ((t.totalPoints / (t.totalGames * 3)) * 100).toFixed(2),
  );
  return t;
};
const homeRes = (name: string, matches: IMatches[]) => {
  if (name !== t.name) {
    restart();
  }
  t.name = name;
  homePoints(matches);
  t.totalGames += 1;
  t.goalsBalance = t.goalsFavor - t.goalsOwn;
  t.efficiency = Number(
    ((t.totalPoints / (t.totalGames * 3)) * 100).toFixed(2),
  );

  return t;
};
const teamsClassify = (matches: ILeaderBoard[]) =>
  matches.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    if (b.goalsFavor !== a.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }
    return b.goalsOwn - a.goalsOwn;
  });

export { homeRes, awayRes, teamsClassify };
