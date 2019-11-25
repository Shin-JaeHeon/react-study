import {observable, computed} from "mobx";
import UserService from '../../services/userService';

export default class RegisterVM {

    static instance = new RegisterVM();
    @observable email: string = '';
    @observable pw: string = '';
    @observable username: string = '';

    register() {
        UserService.instance.action('register', this.username, this.email, this.pw);
    }

    @computed get isLogin(): boolean {
        return UserService.instance.isLogin;
    }
}