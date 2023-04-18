// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from "react";
import "./style.css";
import UCFGym from './UCFGym.jpg';
import polygon from './polygon-1.png';
export default function App() {
//export const Frame = () => {
  return (
    <div className={"frame-frame-wrapper"}>
      <div className={"frame-frame"}>
        <div className={"frame-overlap"}>
          <div className={"frame-rectangle"} />
          <img className={"frame-ucfgym"} src={UCFGym} />
          <div className={"frame-hamburger"}>
            <div className={"frame-rectangle-4"} />
            <div className={"frame-rectangle-5"} />
            <div className={"frame-rectangle-6"} />
          </div>
        </div>
        <div className={"frame-message"}>
          <div className={"frame-overlap-group"}>
            <div className={"frame-rectangle-3"} />
            <img className={"frame-polygon"} src={polygon} />
            <h1 className={"frame-text-wrapper"}>Find the perfect workouts to meet your goals!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
