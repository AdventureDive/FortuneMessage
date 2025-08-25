import MyStore from "./stores/MyStore";

  const GetAPIAsync = async (url: string) => {
    try {
      MyStore.setCallContactAPI(true);
      console.log('IN callGetContactAPI...', url, MyStore.callContactAPI);
      // const ip = "http://172.16.1.72:8080/";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        console.log('Get users request failed with status ' + response.status);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.log('An error occurred while getting contacts.');
      console.error('ERROR====', url, error);
      console.log('IN callGetAPIAsync...setCallAPI FALSE 222');

      return null;
    } finally {
      MyStore.setCallContactAPI(false);
    }
  }
export default GetAPIAsync;