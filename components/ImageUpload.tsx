import { SaveFormat, useImageManipulator } from 'expo-image-manipulator';
import { FAMILY_ID, REACT_APP_SERVER_URL } from '../components/constants';
import { callGetImageAPI, showToast } from './ShowProgess';

const uploadImage = (imageUri: string) => {

    const formData = new FormData();

    // console.log("Upload image: " + imageUri);
    const compressImage = async (imageUri: string) => {
        const manipulator = useImageManipulator(imageUri);
        const rendered = await manipulator.renderAsync();
        const compressed = await rendered.saveAsync({
            compress: 0.7, // Adjust compression quality (0 to 1)
            format: SaveFormat.JPEG,
        });
        return compressed.uri; // Returns the URI of the compressed image
    };

    const uriToBlob = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log("Inside uriToBlob method 3: " + blob);
        return blob;
    };

    const constructFormData = async (imageUri: string) => {
        const compressImageUri = await compressImage(imageUri)
        // const fileName = imageUri.split('/').pop();
        const fileType = 'image/jpeg'; // Or dynamically determine based on image type

        const imageBlob = await uriToBlob(imageUri);
        const filename = imageUri.split('/').pop();

        formData.append('image', imageBlob, filename);
        console.log("Inside constructFormData method 4: " + formData);

    }

    const uploadImage = async () => {

        console.log("Inside Upload image method 2: ");
        // await constructFormData(imageUri);
        const urlImageUpload = REACT_APP_SERVER_URL + '/uploadImage/'+FAMILY_ID;
        try {
            const response = await fetch(urlImageUpload, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    // Add any other necessary headers, e.g., authorization tokens
                },
                // body: formData,
                // body: JSON.stringify({
                //     image: imageUri,
                //     // Add any other data you need to send
                // }),
                body: imageUri
            });

            const data = await response.json();
            console.log('Upload successful:', data);
            showToast({ type: "success", message: "Image uploaded successfully" });
            callGetImageAPI(data);
            return true;
        } catch (error) {
            console.error('Error uploading image:', error);
            showToast({ type: "error", message: "Image upload failed" });
        }
        return false;
    };
    return uploadImage();

};
export default uploadImage;