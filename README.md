# one-local-storage


<!-- ABOUT THE PROJECT -->

## About The Project

This library was built while I was working on a project based on react-native-web, where the goal was to maximize the
code sharing between the web and native codebase.  
Many pieces of shared business logic (thunks, sagas or whatever) at some time needed to persist something (eg: save
token after login).  
This library creates an unique interface that can be used to interact with the localStorage regardless that that your
app is running in a browser or with react-native.


<!-- GETTING STARTED -->

## Getting Started

Install the library from npm registry

### Installation

This is an example of how to list things you need to use the software and how to install them.

* npm

```sh
npm i one-local-storage
```

* yarn

```sh
yarn add one-local-storage
```

##### REACT NATIVE USERS

If you use this library on the web, you are good to go. If you are running on react-native instead, you need to
install '@react-native-community/async-storage', here you can find
the [full docs](https://react-native-async-storage.github.io/async-storage/docs)





<p align="right">(<a href="#top">back to top</a>)</p>





<!-- USAGE EXAMPLES -->

## Usage

This library is basically a cross-platform implementation of the following interface

```typescript
export interface ILocalStorage {
  setItem: (key: keyof LocalStorageKeys, data?: string | null) => void | Promise<any>;
  getItem: (key: keyof LocalStorageKeys) => Promise<string | null>;
  removeItem: (key: keyof LocalStorageKeys) => Promise<boolean>;
  setBoolean: (
    key: keyof LocalStorageKeys,
    data?: boolean | null,
  ) => Promise<boolean | void>;
  getBoolean: (key: keyof LocalStorageKeys) => Promise<boolean>;
  setJson: (
    key: keyof LocalStorageKeys,
    data: any,
  ) => Promise<boolean | void>;
  getJson: <T = any>(key: keyof LocalStorageKeys) => Promise<T | null>;
  setNumber: (
    key: keyof LocalStorageKeys,
    data: number,
  ) => Promise<boolean | void>;
  getNumber: (key: keyof LocalStorageKeys, defaultValue?: number | null) => Promise<number | null>;
  multiSet: (data: LocalStorageKeyValuePair) => Promise<boolean>;
  multiGet: (
    ...keys: (keyof LocalStorageKeys)[]
  ) => Promise<LocalStorageKeyValuePair>;
  multiRemove: (...keys: (keyof LocalStorageKeys)[]) => Promise<boolean>;
  clear: () => void;
  enableLogging: (enabled: boolean) => void;
}

```

```typescript
// since it is the default export, you can rename crossLocalStorage with whatever you want
import crossLocalStorage from "one-local-storage"

// with async/await
const value = await crossLocalStorage.getItem("myLocalStorageKey")

// with promises
crossLocalStorage.getItem("myLocalStorageKey")
  .then(value => {
    alert("result is " + value);
  })

await crollLocalStorage.setItem("myLocalStorageKey", "my value");

// returns a key-value pair
await crollLocalStorage.multiGet("myLocalStorageKey", "my value");


```

> **IMPORTANT** Since react-native's AsyncStorage api are async, you need an async approach on web too.
>

## FULL API

| method            | description                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **setItem**       | it takes in input one of the keys [you have defined](#key-declarations) and the value you want to set. The value can be anything, it will be stringified. If you pass null or undefined, the value will be removed                                                                                                                                                     |
| **getItem**       | it takes in input one of the keys [you have defined](#key-declarations) and returns the value or null if it does not exist                                                                                                                                                                                                                                             |
| **removeItem**    | it takes in input one of the keys [you have defined](#key-declarations) and removes that value. It returns a boolean indicating if the operation succeeded or not.                                                                                                                                                                                                     |
| **setBoolean**    | utility method to save a boolean value. It takes in input one of the keys [you have defined](#key-declarations) and the value you want to set. The value must be a boolean otherwise you get a typescript error (if you are using it). If you pass a string different from "true", it will fail (don't save anything). If you pass null or undefined false will be set |
| **getBoolean**    | utility method to retrieve a boolean value. It takes in input one of the keys [you have defined](#key-declarations) and returns the value as a boolean                                                                                                                                                                                                                 |
| **setNumber**     | utility method to save a number value. It takes in input one of the keys [you have defined](#key-declarations) and the value you want to set. The value must be a valid number otherwise an exception will be thrown. You can also pass null or undefined to remove that key                                                                                           |
| **getNumber**     | utility method to retrieve a number value. It takes in input one of the keys [you have defined](#key-declarations) and an optional default value to return in case the key is not found (returns null by default)                                                                                                                                                      |
| **setJson**       | utility method to save a stringified json value. It takes in input one of the keys [you have defined](#key-declarations) and the value you want to set. The value can be anything, it will be saved as JSON.stringify(value)                                                                                                                                           |
| **getJson**       | utility method to retrieve a parsed json value. It takes in input one of the keys [you have defined](#key-declarations) and returns the value parsed with JSON.parse(value). If you are using typescript, you can pass the generic parameter to infer return type                                                                                                      |
| **multiSet**      | accepts a key-value pair (where the keys must be one of the keys [you have defined](#key-declarations)) to save multiple items at the same time                                                                                                                                                                                                                        |
| **multiGet**      | accepts an arbitrary number of keys that [you have defined](#key-declarations) and returns a key-value pair with the respective values                                                                                                                                                                                                                                 |
| **multiRemove**   | accepts an arbitrary number of keys that [you have defined](#key-declarations) and removes multiple items at the same time                                                                                                                                                                                                                                             |
| **clear**         | remove everything from local storage                                                                                                                                                                                                                                                                                                                                   |
| **enableLogging** | a function to set the logger active or not. By default it is active if `process.env.NODE_ENV == 'development'                                                                                                                                                                                                                                                          || process.env.NODE_ENV == 'dev'`. If it is active, it will log all operations you perform with local storage|

<p align="right">(<a href="#top">back to top</a>)</p>





<!-- ROADMAP -->

## Roadmap

- [x] Publish initial version

[] Add Continuous Integration
[] Add typed bindings between storage keys and the type of value it stores

See the [open issues](https://github.com/taoyuan/one-local-storage/issues) for a full list of proposed features (and
known issues).





<p align="right">(<a href="#top">back to top</a>)</p>





<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1. Fork the Project


2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)


3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)


4. Push to the Branch (`git push origin feature/AmazingFeature`)


5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>





<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.





<p align="right">(<a href="#top">back to top</a>)</p>





<!-- CONTACT -->

## Contact

Apperside - https://apperside.com - info@apperside.com

Project Link: [https://github.com/taoyuan/one-local-storage](https://github.com/taoyuan/one-local-storage)





<p align="right">(<a href="#top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->



<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
