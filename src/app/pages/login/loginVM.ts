import {computed, observable} from "mobx";
import HttpClient from "../../libs/httpClient";
import UserService from '../../services/userService';

export default class LoginVM {

    static instance = new LoginVM();
    @observable email: string = '';
    @observable pw: string = '';

    login() {
        UserService.instance
            .action('login', this.email, this.pw)
            .then(user => HttpClient.updateHeaderByLogin(user.token));
    }

    @computed get isLogin(): boolean {
        return UserService.instance.isLogin;
    }
}