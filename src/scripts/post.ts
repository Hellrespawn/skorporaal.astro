export default class Post {
  date?: Date;

  constructor(
    public title: string,
    public type: string,
    public lang: string,
    public url: string,
    date?: string
  ) {
    this.date = date ? new Date(date) : undefined;
  }
}
