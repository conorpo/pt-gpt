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
import "./assets/style.css";
import UCFGym from './assets/imgs/UCFGym.jpg';
import polygon from './assets/imgs/polygon-1.png';

export default function App() {
  return (
    <div className={"frame-frame-wrapper"}>
      <div className={"frame-frame"}>
        <div className={"frame-overlap"}>
          <div className={"frame-rectangle"} />
          <img className={"frame-ucfgym"} src={UCFGym} />
        </div>
        <div className={"frame-message"}>
          <div className={"frame-overlap-group"}>
            <div className={"frame-rectangle-3"} />
            <img className={"frame-polygon"} src={polygon} />
            <h1 className={"frame-text-wrapper"}>Find the perfect workouts to meet your goals!</h1>
          </div>
        </div>
        <button type="button" className={"frame-div"}>Enter Data</button>
        <button type="button" className={"frame-text-wrapper-2"}>Chat with Personal Trainer</button>
      </div>
    </div>
  );
};

function Data() {
  return (
    <div className={"data-data-wrapper"}>
      <div className={"data-data"}>
        <div className={"data-back-arrow"}>
          <div className={"data-rectangle"} />
          <div className={"data-rectangle-3"} />
        </div>
        <div className={"data-height"}>
          <div className={"data-text-wrapper"}>Height</div>
          <input className={"data-feet"} />
          <div className={"data-div"}>ft.</div>
          <input className={"data-in"} />
          <div className={"data-text-wrapper-2"}>in.</div>
        </div>
        <div className={"data-weight"}>
          <div className={"data-text-wrapper-3"}>Weight</div>
          <input className={"data-input"} />
          <div className={"data-text-wrapper-4"}>lbs.</div>
        </div>
        <div className={"data-gender"}>
          <div className={"data-p"}>Gender (enter M or F)</div>
          <input className={"data-input"} />
        </div>
        <h1 className={"data-h-1"}>Data</h1>
      </div>
    </div>
  );
}

function Chat () {
  return (
    <div className={"PT-PT-wrapper"}>
      <div className={"PT-PT"}>
        <div className={"PT-overlap"}>
          <div className={"PT-heading"}>
            <div className={"PT-overlap-group"}>
              <div className={"PT-overlap-group1"}>
                <div className={"PT-text-wrapper"}>PT</div>
              </div>
              <div className={"PT-div"}>Personal Trainer</div>
            </div>
          </div>
          <div className={PT-back-arrow}>
            <div className={"PT-rectangle"} />
            <div className={"PT-rectangle-3"} />
          </div>
        </div>
      </div>
    </div>
  );
}
