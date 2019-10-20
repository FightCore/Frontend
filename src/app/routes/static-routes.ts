export class StaticRoutes {
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
  public static viewCharacter: string = 'character/:characterId';
  public static viewUser: string = 'user/:userId';
  public static home: string = '';
}
