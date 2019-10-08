export class UserOptions {
    public static gameId = 6;

    public static getCurrentGame(): number {
        const gameId = localStorage.getItem('gameId');
        if (gameId) {
            return parseFloat(gameId);
        }

        localStorage.setItem('gameId', this.gameId.toString());

        return this.gameId;
    }

    public static setCurrentGame(gameId: number): void {
        this.gameId = gameId;

        localStorage.setItem('gameId', this.gameId.toString());
    }
}
