import { action, makeObservable, observable } from 'mobx';
import { ImageData } from '../APITypes';

class MyStore {
    callAPI = false;
    callLoginAPI = false;
    callContactAPI = false;
    callContactEditAPI = false;
    callTaskAPI = false;
    callDeleteContactAPI = false;
    loginUserId = -1;
    loginAPIResult = '';
    callSignUpAPI = false;
    signUpAPIResult = '';
    callImagesIdsAPI = false;
    callImageAPI = false;
    imageList: ImageData[] = [] as ImageData[];
    currentFamilyId = -1;


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
            setCallTaskAPI: action,
            callDeleteContactAPI: observable,
            setCallDeleteContactAPI: action,
            loginAPIResult: observable,
            setLoginAPIResult: action,
            callSignUpAPI: observable,
            setCallSignAPI: action,
            signUpAPIResult: observable,
            setSignUpAPIResult: action,
            callImagesIdsAPI: observable,
            setCallImageIdsAPI: action,
            callImageAPI: observable,
            setCallImageAPI: action,
            imageList: observable,
            addToimageList: action,
            resetimageList: action,
            currentFamilyId: observable,
            setCurrentFamilyId: action,
            removeImage: action
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
    setCallDeleteContactAPI = (value: boolean) => {
        this.callContactAPI = value;
    }
    setLoginUserId = (value: number) => {
        this.loginUserId = value;
    }
    setLoginAPIResult = (value: string) => {
        this.loginAPIResult = value;
    }
    setCallSignAPI = (value: boolean) => {
        this.callSignUpAPI = value;
    }
    setSignUpAPIResult = (value: string) => {
        this.signUpAPIResult = value;
    }
    setCallImageIdsAPI = (value: boolean) => {
        this.callLoginAPI = value;
    }
    setCallImageAPI = (value: boolean) => {
        this.callImageAPI = value;
    }

    setCurrentFamilyId = (value: number) => {
        this.currentFamilyId = value;
    }

    addToimageList = (imageData: ImageData) => {
        this.imageList.push(imageData);
    }

    resetimageList = () => {
        this.imageList = [] as ImageData[];
    }

    removeImage = (imageId: number) => {
        this.imageList.forEach(i => {
            if (i.id === imageId) {
                const index = this.imageList.indexOf(i);
                this.imageList.splice(index, 1);
            }
        });
    }

}

export default new MyStore();