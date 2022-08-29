// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
export const urls = { 
  //   BaseUrl: 'http://localhost:8000/api',
  //  ImageUrl: 'http://127.0.0.1:8000/storage/images',
    BaseUrl: 'https://api.jobtasker.com/api',
    ImageUrl: 'https://api.jobtasker.com/api',
};

export const firebaseConfig = {
  apiKey: "AIzaSyAmmurWpO2ltlInYcMeFg6nYvfqb-nUNQc",
  authDomain: "jobtasker-6ce0e.firebaseapp.com",
  projectId: "jobtasker-6ce0e",
  storageBucket: "jobtasker-6ce0e.appspot.com",
  messagingSenderId: "988990386961",
  appId: "1:988990386961:web:6aef9e5506a64944eb52b0",
  measurementId: "G-XE3XJ91MXV",
  vapidKey: "BLlqS_yyzxhaUTmzGYy1L-Ga96Z4kqVeJ2IjjlaQM0j_idln0dr1DpC9HTk0sAxuz-8sHYfnjcJ7dSL7V8WqMxY"
}

export const googleLogin = {
  client_id : '659496099656-4c9peic07s9u8gko6rf54da33rqunj6l.apps.googleusercontent.com',
  secret : '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'
}

export const GoogleMapApi = {
  apikey : 'AIzaSyAUvr-npfOeFCCn_NDt8f4HlbqM3Adq7mU'
}

export const stripeApi = {
  publishable_key : 'pk_test_GFHAENeCoQslPfs1W7RElzYK',
  secret_key : 'sk_test_nah28nnuA5f3JDjlLfg5XgBA'
}