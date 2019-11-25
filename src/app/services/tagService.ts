import Service from '../libs/Service';
import TagRequest from '../requests/tagRequest';
import {observable} from 'mobx';

export default class TagService extends Service {
    readonly request: TagRequest;
    @observable static tags: ReadonlyArray<string> = [];
    static instance = new TagService();

    constructor() {
        super();
        this.request = TagRequest.instance;
        TagRequest.instance
            .getPopularTags()
            .then(tags => TagService.tags = tags);
    }
}