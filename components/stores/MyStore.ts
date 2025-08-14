import { action, makeObservable, observable } from 'mobx';

class MyStore {
    callAPI = false;
    callLoginAPI = false;
    callContactAPI = false;
    callContactEditAPI = false;
    callTaskAPI = false;
    loginUserId = -1;

    constructor() {
        makeObservable(this, {
            callAPI: observable,
            setCallAPI: action,
            loginUserId: observable,
            setLoginUserId: action,
            callLoginAPI: observable,
            setCallLoginAPI: action,
            callContactAPI: observable,
            setCallContactAPI: action,
            callContactEditAPI: observable,
            setCallContactEditAPI: action,
            callTaskAPI: observable,
            setCallTaskAPI: action
        });
    };

    setCallLoginAPI = (value: boolean) => {
        this.callLoginAPI = value;
    }
    setCallAPI = (value: boolean) => {
        this.callAPI = value;
    }
    setCallTaskAPI = (value: boolean) => {
        this.callTaskAPI = value;
    }
    setCallContactAPI = (value: boolean) => {
        this.callContactAPI = value;
    }
    setCallContactEditAPI = (value: boolean) => {
        this.callContactAPI = value;
    }
    setLoginUserId = (value: number) => {
        this.loginUserId = value;
    }
}

export default new MyStore();