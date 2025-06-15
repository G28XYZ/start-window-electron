export interface IArticle {
  source     : { id: string; name: string };
  author     : string;
  title      : string;
  description: string;
  url        : string;
  urlToImage : string;
  publishedAt: string;
  content    : string;
}

export interface IGame {
  id                    : number;
  title                 : string;
  thumbnail             : string;
  short_description     : string;
  game_url              : string;
  genre                 : string;
  platform              : string;
  publisher             : string;
  developer             : string;
  release_date          : string;
  freetogame_profile_url: string;
}
