# FaceCheck

[![Build Status](https://travis-ci.com/SCCapstone/FaceCheck.svg?token=eiKCbjzezvQmo3HdzB8y&branch=master)](https://travis-ci.com/SCCapstone/FaceCheck)

## What is FaceCheck
Facial recognition application, that when paired with QR codes and a react native application, can be used to keep track of the attendance of students. The application will use the picture on their student id card and compare it to a picture taken at the time of scanning the QR code. This is used to identify if the person scanning the QR code is the expected student. The QR code will be scanned twice, once at the beginning of class, and once at the student’s departure. This will ensure correct timetables of the student’s attendance. This can be applied to universities, as well as other education facilities. Expansion areas include using the application for payment at the school store, allowing professors or faculty to create a reward system for attending class.

## Getting Started

### Prerequisites for iOS
- Install [Node.js](https://nodejs.org/en/download/)
- Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) via the Mac App Store
- Install [React-Native](https://facebook.github.io/react-native/docs/getting-started)


### Installing
1. git clone git@github.com:SCCapstone/FaceCheck.git
2. cd FaceCheck/FaceCheckApp
3. yarn run load

### To Start the Application in an Xcode Simulator
- npm run ios

## Built With
- React-Native
- Firebase

## Testing
### Cavy - E2E Tests
- Install Cavy cli

    ```npm i -g cavy-cli ```
- To run test on android, use

    ```cavy run-android ```
- To run test on ios, use
    
    ```cavy run-ios ```

### Jest - Function Tests
- Install Jest cli

    ```npm i -g jest-cli ```

- Run jest tests 

    ```npm test```

## Authors
- Michael Miranda
- Samuel Nichols
- Ibrahim Salman
- Jonathan Sharp
- Matthew Sharp

## **©** 2019 FaceCheck

**Keywords: Face recognition, AI, QR codes, React Native, mobile application**
