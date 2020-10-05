export interface TweetInterface {
  id: string;
  user: UserInterface | string;
  text: string;
  likedBy: Array<String>;
  retweetedBy: Array<String>;
  comments: Array<any>;
  date: Date;
  imgURL: string;
}

export interface UserInterface {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  followers: Array<UserInterface | string>;
  following: Array<UserInterface | string>;
  tweets: Array<TweetInterface | string>;
  dateOfBirth: Date;
  dateJoined: Date;
}

export interface ProfileInterface {
  user: UserInterface;
  bio: string | null;
  location: string | null;
  website: string | null;
  dateJoined: Date;
}

export type UserCredentials = {
  username: UserInterface["username"];
  password: UserInterface["password"];
};

export type UserForToken = {
  username: UserCredentials["username"];
  id: UserInterface["id"];
};
