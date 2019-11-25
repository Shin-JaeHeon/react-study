import {observable} from "mobx";
import SettingsRequest from "../../requests/settingsRequest";
import UserService from '../../services/userService';

export default class SettingsVM {
    static instance = new SettingsVM();
    @observable email = '';
    @observable bio = '';
    @observable username = '';
    @observable image = '';
    @observable password = '';

    initialize() {
        const vm = UserService.instance;
        this.email = vm.user.email;
        this.image = vm.user.image;
        this.bio = vm.user.bio;
        this.username = vm.user.username;
    }

    update() {
        SettingsRequest
            .instance
            .update({image: this.image, username: this.username, bio: this.bio, email: this.email}, this.password)
            .then(user => {
                UserService.instance.user = user;
                alert('User data Updated');
            });
    }
}
