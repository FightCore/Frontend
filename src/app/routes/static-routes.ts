export class StaticRoutes {
  public static about: string = 'about';
  public static edits: string = 'edits';
  public static posts: string = 'post';
  public static createPost: string = 'post/create';
  public static editPost: string = 'post/edit/:postId';
  public static editPostNoId: string = 'post/edit/';
  public static viewPost: string = 'post/:postId';
  public static viewPostNoId: string = 'post/';
  public static login: string = 'login';
  public static authCallback: string = 'auth-callback';
  public static characters: string = 'character';
  public static editCharacter: string = 'character/edit/:characterId';
  public static editCharacterNoId: string = 'character/edit/';
  public static viewCharacter: string = 'character/:characterId';
  public static viewUser: string = 'user/:userId';
  public static viewUserNoId: string = 'user/';
  public static game: string = 'game';
  public static viewGame: string = 'game/:gameId';
  public static home: string = '';
}
