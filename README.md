# Welcome to My Planner app 👋
My son is the inspiration to choose this My Planner app.  
This the first summer I'm sitting infornt of the ssytem for longer time when his summer leave.  
So he confused and annoyed so I engaged him telling story about coding, making simple games like bottle snakes,  tic-tac-to, so then i decide to make react native app for him then end up with My Planner app.  

## About My Planner  
My planner app is combination of digital calendar, digital sticker, family whats-app, and digital document locker.  

### Core Functionality

I have coverd some of the core functionality that We used on our daily lifes.

![My Planner - Core Functionality](https://github.com/AdventureDive/FortuneMessage/blob/master/assets/images/MyPlanner.gif)

| CRUD || Document |
| :--- | :---: | :--- |
| **Contacts**  Where you can share the contacts like family doctor, day care contacts, baby sitter contact with the family || **Gallery**  Share pictures with family |
| **Calendar**  Where you see events, tasks and activities|| **Documents**  Share documents like scaned copy of ID's or any common documents |
| **Message**  Where you send messages among the family || **Activity**  Save activites such as Yoga and classes like soccer, music planned/enrolled  || **To-Do** Where anyone can assign task for family members || **Meals**  Where We can have meal plan |
| **Notes** Save any common action item planned for future || **Recipes** Create or Save recipes from web |
| **Shopping** Where We can have our monthly essential buying list, progressivily added and classified || **Budget** Where you can note you expenses |

## Architectural Diagram

#### Key Architecture Components:
| Key Architecture Components | | |
| :--- | :---: | :--- |
| **Frontend (React Native)** || Frontend Layer (React Native) <br/> Cross-platform mobile app development <br/> State management and navigation <br/> HTTP client for API communication || **API Layer** || Features the Spring Boot application with its components (Controllers, Services, Repositories), plus security/authentication and Redis caching || **Backend (Spring Boot)** ||  RESTful API with MVC architecture <br/> Java-based backend<br/>  RESTful web services<br/>  Embedded Tomcat server<br/> Service and repository pattern implementation || **Database (PostgreSQL)** ||Relational database<br/> ACID compliance<br/> JSON support<br/> Advanced indexing<br/> Concurrent connections<br/> Data integrity| 

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


