export interface TweetInterface {
  id: string;
  user: string;
  value: string;
  likedBy: Array<String>;
  retweetedBy: Array<String>;
  comments: Array<any>;
  date: Date | undefined;
}

export interface UserInterface {
  username: String;
  password: string;
  followers: Array<String>;
  following: Array<String>;
  tweets: Array<TweetInterface>;
  bio: string;
  location: string;
  birthDate: Date | undefined;
  website: string;
}
