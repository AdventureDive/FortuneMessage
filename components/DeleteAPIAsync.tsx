import { showToast } from "./ShowProgess";
import MyStore from "./stores/MyStore";

const deleteAPIAsync = async (url: string) => {
    console.log("-> async functions API call for delete contact");
    try {
        MyStore.setCallContactEditAPI(true);
        console.log("-> Fetch delete URL details" + url);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log("Delete API - Network Fail");
            showToast({ type: "error", message: "Delete request failed with status ' + response.status" })
            return "false";
        }
        return "true";
    } catch (error) {
        showToast({ type: "error", message: 'An error occurred while deleting.' });
        console.error('ERROR====', url, error);
    } finally {
        MyStore.setCallDeleteContactAPI(false);
    }
};

export default deleteAPIAsync;