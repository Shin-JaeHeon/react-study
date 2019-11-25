export interface UserVO {
	id: number;
	email: string;
	username: string;
	token: string;
	image: string;
	bio: string;
}

export default class User {
  id: number;
  email: string;
  username: string;
  token: string;
  image: string;
  bio: string;

  constructor(rawData: UserVO) {
    this.id = rawData.id;
    this.email = rawData.email;
    this.username = rawData.username;
    this.token = rawData.token;
    this.image = rawData.image;
    this.bio = rawData.bio;
  }
}