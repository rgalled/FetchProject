import HttpClient from './HttpClient.js';

export default class PageItem {

    constructor(parent) {
        this.parent = parent;
        this.httpClient = new HttpClient();
    }
}
