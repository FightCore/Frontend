export class UserOptions {
    public static gameId = 6;
    private static minimalMode: boolean = false;

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

    public static getMinimalMode(): boolean {
        const minimalMode = localStorage.getItem('minimalMode');
        if (minimalMode) {
            return minimalMode === 'true';
        }

        localStorage.setItem('minimalMode', this.minimalMode.toString());

        return this.minimalMode;
    }

    public static setMinimalMode(minimalMode: boolean): void {
        this.minimalMode = minimalMode;

        localStorage.setItem('minimalMode', this.minimalMode.toString());
    }
}
