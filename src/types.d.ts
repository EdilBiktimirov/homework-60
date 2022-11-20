export interface Post {
  author: string;
  message: string;
  id?: number;
}

export interface Messages {
  _id: string;
  message: string;
  author: string;
  datetime: string;
}