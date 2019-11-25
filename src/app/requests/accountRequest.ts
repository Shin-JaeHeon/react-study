import HttpClient from "../libs/httpClient";
import {Profile} from "../interface";

export default class AccountRequest extends HttpClient {
    static instance = new AccountRequest();

    constructor() {
        super('profiles');
    }

    async getUserInfo(username): Promise<Profile> {
        return (await this.axios.get('/' + username)).data.profile;
    }
}