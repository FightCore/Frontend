export class GameThemes {
    public static themeDictionary: Map<number, string> = new Map([
        [1, 'smash-theme'],
        [2, 'melee-theme'],
        [3, 'brawl-theme'],
        [4, 'ds-theme'],
        [5, 'wiiu-theme'],
        [6, 'ultimate-theme'],
      ]);

  /**
   * Gets the class name of the theme for a game.
   * @param gameId the id of the game to get the theme for.
   */
  public static getThemeForGameId(gameId: number, force: boolean = false) {
    const theme = this.themeDictionary.get(gameId);
    return force ? 'force-' + theme : theme;
  }
}
