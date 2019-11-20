import HttpClient from "../libs/httpClient";

export default class TagRequest extends HttpClient {
  static instance = new TagRequest();

  constructor() {
    super('tags');
  }

  async getPopularTags(): Promise<ReadonlyArray<string>> {
    return (await this.axios.get('')).data.tags;
  }
}