import { action, makeObservable, observable } from 'mobx';

class MyStore {
    callAPI = false;
    loginUserId = -1;

    constructor() {
        makeObservable(this,{
            callAPI:observable,
            setCallAPI: action,
            loginUserId:observable,
            setLoginUserId: action,
        });
    };

    setCallAPI = (value: boolean) => {
        this.callAPI = value;
    }

    setLoginUserId = (value: number) => {
        this.loginUserId = value;
    }
}

export default new MyStore();