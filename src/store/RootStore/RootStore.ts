import ApiStore from "./ApiStore";

export default class RootStore {
    readonly apiStore = new ApiStore('https://www.googleapis.com');
}