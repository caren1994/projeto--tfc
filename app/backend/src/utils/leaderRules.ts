import { IResults } from '../api/interfaces/IResults';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';

export default class LeaderRules {
  static createResult(teams: Team[], matches: Matche[], teamSide: string) { // recebe um array de times,o matche de partidas finalizadas e o lado do time away ou home
    const arrayTeams = teams.map((team) => ({ // para cada time ele gera um obj
      name: team.dataValues.teamName as string,
      totalPoints: LeaderRules.totalPoints(matches, team.id, teamSide),
      totalGames: LeaderRules.totalGames(matches, team.id, teamSide),
      totalVictories: LeaderRules.matchesTeamsVictories(matches, team.id, teamSide),
      totalDraws: LeaderRules.matchesTeamsDraws(matches, team.id, teamSide),
      totalLosses: LeaderRules.matchesTeamsLosses(matches, team.id, teamSide),
      goalsFavor: LeaderRules.totalGoals(matches, team.id, teamSide),
      goalsOwn: LeaderRules.totalGoalsOwn(matches, team.id, teamSide),
      goalsBalance: LeaderRules.diferenceGoals(
        LeaderRules.totalGoals(matches, team.id, teamSide),
        LeaderRules.totalGoalsOwn(matches, team.id, teamSide),
      ),
      efficiency: LeaderRules.efficiency(matches, team.id, teamSide),
    }));
    const sortteams = LeaderRules.sortTeams(arrayTeams);
    return sortteams;
  }

  static diferenceGoals(goalsFavor: number, goalsOwn: number): number {
    return goalsFavor - goalsOwn;
  }

  static matchesTeamsVictories(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.filter(
      (match) => match[side] === teamId, // filtra apenas as partidas do time home ou away (side) recebido que for igual ao teamId
    ).filter((team) => team[goalsTeam]// filtra apenas a quantidade de vezes que os gols do side recebido for marior que o do outro side
  > team[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`]).length;
  }

  static matchesTeamsDraws(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.filter(
      (match) => match[side] === teamId,
    ).filter((team) => team[goalsTeam]// filtra apenas a quantidade de vezes que os gols do side recebido for igual ao do outro side
  === team[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`]).length;
  }

  static matchesTeamsLosses(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.filter(
      (match) => match[side] === teamId,
    ).filter((team) => team[goalsTeam]// filtra apenas a quantidade de vezes que os gols do side recebido for menor que o do outro side
  < team[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`]).length;
  }

  static totalGoals(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';// construção da string
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';// construção da string
    return matches.reduce((acc, curr) => { // curr=== ao valor do objeto a cada iteração
      let goals = acc;
      if (curr[side] === teamId) { // se o valor de homeTeamId ou awayTeamId for igual ao teamId enviado por parametro
        goals += curr[goalsTeam];// goals recebe o valor (number)de homegoalsTeam ou awaygoalsteam
      }
      return goals;
    }, 0);
  }

  static totalGoalsOwn(matches: Matche[], teamId: number, teamSide: string): number { // gols sofridos
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    return matches.reduce((acc, curr) => {
      let goals = acc;
      if (curr[side] === teamId) { // se curr[side] for home ou away o currteamgoals faz o inverso
        goals += curr[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`];// construção de outra string para
      }
      return goals;
    }, 0);
  }

  static totalGames(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';// construção da string
    return matches.filter((match) => match[side] === teamId).length;// retorna o total de partidas de um teamid
  }

  static totalPoints(matches: Matche[], teamId: number, teamSide: string): number { // soma o numero de vitorias e de empates
    return (
      LeaderRules.matchesTeamsVictories(matches, teamId, teamSide) * 3)
    + (LeaderRules.matchesTeamsDraws(matches, teamId, teamSide) * 1);
  }

  static efficiency(matches: Matche[], teamId: number, teamSide: string): number {
    const pontos = LeaderRules.totalPoints(matches, teamId, teamSide);
    const jogos = LeaderRules.totalGames(matches, teamId, teamSide);

    const resultado = Number(((pontos / (jogos * 3)) * 100).toFixed(2));// Para o campo Aproveitamento do time (%), que é a porcentagem de jogos ganhos, use a seguinte fórmula: [P / (J * 3)] * 100, onde:

    return resultado;
  }

  static sortTeams(arr: IResults[]): IResults[] {
    return arr.sort((a, b) => { // faz o sort de acordo com as condições
      if (a.totalPoints !== b.totalPoints) { // por maior pontuação
        return b.totalPoints - a.totalPoints;
      }
      if (a.goalsFavor - a.goalsOwn !== b.goalsFavor - b.goalsOwn) { // maior saldo de gols
        return b.goalsFavor - b.goalsOwn - a.goalsFavor + a.goalsOwn;
      }
      return b.goalsFavor - a.goalsFavor;// ou maior gols a favor
    });
  }
}
