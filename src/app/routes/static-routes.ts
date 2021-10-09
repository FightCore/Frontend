export class StaticRoutes {
  public static edits = 'edits';
  public static posts = 'post';
  public static createPost = 'post/create';
  public static editPost = 'post/edit/:postId';
  public static editPostNoId = 'post/edit/';
  public static viewPost = 'post/:postId';
  public static viewPostNoId = 'post/';
  public static login = 'login';
  public static register = 'register';
  public static authCallback = 'auth-callback';
  public static characters = 'character';
  public static editCharacter = 'character/edit/:characterId';
  public static editCharacterNoId = 'character/edit/';
  public static viewCharacter = 'character/:characterId';
  public static viewUser = 'user/:userId';
  public static viewUserNoId = 'user/';
  public static game = 'game';
  public static viewGame = 'game/:gameId';
  public static frameData = 'framedata';
  public static techniques = 'techniques';
  public static viewFrameData = 'framedata/:characterId';
  public static home = '';
}
