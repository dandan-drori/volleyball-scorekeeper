import { getCurrentTime, getGameWinner, getServingPlayer, getSetWinner, getWonSetsByEachTeam, padToTwoDigits } from './game.service';

describe('Game Service', () => {
    describe('getSetWinner', () => {
        it('should return empty string when no team has reached winning score for any set before the last', () => {
            const team = { score: 23, name: 'Bardelas' };
            const otherTeam = { score: 21, name: 'Harish' };
            const isLastSet = false;
            const winner = getSetWinner(team, otherTeam, isLastSet);
            expect(winner).toBe('');
        });

        it('should return empty string when no team has reached winning score for the last set', () => {
            const team = { score: 13, name: 'Bardelas' };
            const otherTeam = { score: 14, name: 'Harish' };
            const isLastSet = true;
            const winner = getSetWinner(team, otherTeam, isLastSet);
            expect(winner).toBe('');
        });
        
        it("should return first team's name", () => {
            const team = { score: 25, name: 'Bardelas' };
            const otherTeam = { score: 23, name: 'Harish' };
            const isLastSet = false;
            const winner = getSetWinner(team, otherTeam, isLastSet);
            expect(winner).toBe(team.name);
        });
        
        it("should return second team's name", () => {
            const team = { score: 15, name: 'Bardelas' };
            const otherTeam = { score: 17, name: 'Harish' };
            const isLastSet = true;
            const winner = getSetWinner(team, otherTeam, isLastSet);
            expect(winner).toBe(otherTeam.name);
        });
    });
    
    describe('getServingPlayer', () => {
        it('should return serving player number from homeTeam', () => {
            const currentSet = {
                homeTeam: {
                    isServing: true,
                    currentRotation: {1: 2, 2: 3},
                },
            };
            const servingPlayer = getServingPlayer(currentSet);
            expect(servingPlayer).toBe(2);
        });
        
        it('should return serving player number from awayTeam', () => {
            const currentSet = {
                homeTeam: {
                  isServing: false,  
                },
                awayTeam: {
                    currentRotation: {1: 2, 2: 3},
                },
            };
            const servingPlayer = getServingPlayer(currentSet);
            expect(servingPlayer).toBe(2);
        });
    });
    
    describe('getWonSetsByEachTeam', () => {
        it('should return 3:2 in sets in favor of homeTeam', () => {
            const sets = [{winner: 'homeTeam'},{winner: 'homeTeam'},{winner: 'homeTeam'},{winner: 'awayTeam'},{winner: 'awayTeam'}];
            const res = getWonSetsByEachTeam(sets);
            expect(res.homeTeam).toBe(3);
            expect(res.awayTeam).toBe(2);
        });
    });
    
    describe('getGameWinner', () => {
        it('should return empty string if no team has reached 3 sets', () => {
            const sets = [{winner: 'homeTeam'},{winner: 'homeTeam'},{winner: 'awayTeam'},{winner: 'awayTeam'}];
            const res = getGameWinner(sets);
            expect(res).toBe('');
        });
        
        it('should return homeTeam if homeTeam has reached 3 sets', () => {
            const sets = [{winner: 'homeTeam'},{winner: 'homeTeam'},{winner: 'homeTeam'},{winner: 'awayTeam'},{winner: 'awayTeam'}];
            const res = getGameWinner(sets);
            expect(res).toBe('homeTeam');
        });
        
        it('should return homeTeam if awayTeam has reached 3 sets', () => {
            const sets = [{winner: 'homeTeam'},{winner: 'homeTeam'},{winner: 'awayTeam'},{winner: 'awayTeam'},{winner: 'awayTeam'}];
            const res = getGameWinner(sets);
            expect(res).toBe('awayTeam');
        });
    });
    
    describe('getCurrentTime', () => {
        it('should return current time formatted as HH:MM', () => {
            const res = getCurrentTime();
            const isColonPresentInString = res.includes(':');
            expect(isColonPresentInString).toBeTruthy();
            expect(res.length).toBe(5);
        });
    });
    
    describe('padToTwoDigits', () => {
        it('should return string with length 2', () => {
            const res = padToTwoDigits(3);
            expect(res.length).toBe(2);
        });
        
        it('should return string with leading 0', () => {
            const res = padToTwoDigits(3);
            expect(res.includes('0')).toBeTruthy();
        });
    });
});