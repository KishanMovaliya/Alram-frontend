// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:4001',
  firebaseConfig : {
    apiKey: "AIzaSyC0nxrkH5v1rZgXXmkJZ3JvcOn_BRxHGmE",
    authDomain: "emailshdeule.firebaseapp.com",
    databaseURL: "https://emailshdeule.firebaseio.com",
    projectId: "emailshdeule",
    storageBucket: "emailshdeule.appspot.com",
    messagingSenderId: "126149942558",
    appId: "1:126149942558:web:c2f436b84adea0bc78bd0f"
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
