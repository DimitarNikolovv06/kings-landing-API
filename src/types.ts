export interface TweetInterface extends Document {
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
  password: String;
  followers: Array<String>;
  following: Array<String>;
  tweets: Array<TweetInterface>;
  bio: String;
  location: String;
  birthDate: Date | undefined;
  website: String;
}
