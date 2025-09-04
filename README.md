# Welcome to My Planner app 👋
My son was the inspiration for choosing this My Planner app.
This was the first summer I sat in front of the system for a longer time during his summer break. He became confused and annoyed, so I engaged him by telling stories about coding and making simple games like bottle snake and tic-tac-toe. I then decided to make a React Native app for him, which ended up becoming My Planner app. 

## About My Planner  
My Planner app is a combination of a digital calendar, digital sticker collection, family WhatsApp, and digital document locker.  

### Core Functionality
I have covered some of the core functionality that we use in our daily lives.

![My Planner - Core Functionality](https://github.com/AdventureDive/FortuneMessage/blob/master/assets/images/MyPlanner.gif)

| CRUD || Document |
| :--- | :---: | :--- |
| **Contacts**   Where you can share contacts like family doctor, daycare contacts, babysitter contact with the family || **Gallery**  Share pictures with family |
| **Calendar**  Where you see events, tasks and activities|| **Documents**  Share documents like scanned copies of ID's or any common documents |
| **Message**  Where you send messages among the family || **Activity**  Save activites such as yoga and classes like soccer, music planned/enrolled  || **To-Do** Where anyone can assign tasks for family members || **Meals**  Where We can have meal plans |
| **Notes** Save any common action items planned for future || **Recipes** Create or Save recipes from web |
| **Shopping** Where We can have our monthly essential buying list, progressively  added and classified || **Budget** Where you can note you expenses |

## Architectural Diagram

![Architectural Diagram](https://github.com/AdventureDive/diagram-as-code/blob/main/src/output/task_manager_architecture.png?raw=true)

#### Key Architecture Components:

| CRUD || Document |
| :--- | :---: | :--- |
| **Frontend (React Native)**  || Frontend Layer (React Native) <br/> Cross-platform mobile app development <br/> State management and navigation <br/> HTTP client for API communication |
| **API Layer** || Features the Spring Boot application with its components (Controllers, Services, Repositories), <br/> plus security/authentication and Redis caching |
| **Backend (Spring Boot)** || RESTful API with MVC architecture <br/> Java-based backend<br/>  RESTful web services<br/>  Embedded Tomcat server<br/> Service and repository pattern implementation  |
| **Database (PostgreSQL)**  || Relational database<br/>  ACID compliance<br/>  JSON support<br/>  Advanced indexing<br/> Concurrent connections<br/>  Data integrity |

#### Data Flow:
1. User interacts with React Native mobile app
2. App sends HTTP requests to API Gateway
3. Gateway routes requests to Spring Boot server
4. Spring Boot processes business logic
5. Application queries PostgreSQL database
6. Data flows back through the same path


#### Frontend Languages & Libraries

| React Components/Hooks | Expo SDK | React Native Components | Third-party libraries |
| :--- | :--- | :--- | :---|
| useState<br/> useEffect<br/> useRef<br/> StrictMode<br/> InputText | Calendar<br/>Checkbox <br/>Contacts<br/> DocumentPicker<br/> Font<br/> Image<br/> ImagePicker <br/> ImageManipulator<br/> ImageLoader<br/> LinearGradient |   Text<br/> View<br/> ScrollText<br/> FlatList<br/> Image<br/> TestInput |  react-native-pager-view<br/>  react-native-gesture-handler<br/> react-native-paper<br/> react-native-toast-message<br/>  react-native-reanimated<br/> react-native-masked-view/masked-view<br/>  react-native-community/datetimepicker |




























# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


