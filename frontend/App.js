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


import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import "./style.css";
import UCFGym from './UCFGym.jpg';
import polygon from './polygon-1.png';

//home page styles and component code
const home = StyleSheet.create({
  frame_frame_wrapper: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  frame_frame: {
    backgroundColor: '#ffffff',
    border: '1px none',
    height: '812px',
    position: 'relative',
    width: '375px',
  },

  frame_overlap: {
    height: '402px',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '375px',
  },

  frame_rectangle: {
    backgroundColor: '#ffcc00',
    height: '315px',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '375px',
  },

  frame_ucfgym: {
    borderRadius: '20px',
    height: '241px',
    left: '7px',
    objectFit: 'cover',
    position: 'absolute',
    top: '161px',
    width: '362px',
  },

  frame_message: {
    height: '112px',
    left: '11px',
    position: 'absolute',
    top: '444px',
    width: '274px',
  },

  frame_overlap_group: {
    height: '112px',
    left: '3px',
    position: 'relative',
    width: '269px',
  },

  frame_rectangle_3: {
    backgroundColor: '#d9d9d9',
    borderRadius: '30px',
    height: '112px',
    left: '17px',
    position: 'absolute',
    top: '0',
    width: '252px',
    zIndex: '5',
  },

  frame_polygon: {
    height: '19px',
    left: '0',
    position: 'absolute',
    top: '83px',
    width: '37px',
  },

  frame_text_wrapper: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '25px',
    fontWeight: '700',
    height: '91px',
    left: '33px',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    top: '0',
    width: '220px',
    zIndex: '10',
  },

  frame_div: {
    color: '#ffffff',
    backgroundColor: '#000000',
    cursor: 'pointer',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '18px',
    fontWeight: '700',
    height: '46px',
    left: '33px',
    letterSpacing: '0',
    lineHeight: '40px',
    position: 'absolute',
    textAlign: 'center',
    top: '50px',
    width: '110px',
    borderRadius: '5px',
  },

  frame_text_wrapper_2: {
    color: '#ffffff',
    backgroundColor: '#000000',
    cursor: 'pointer',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '18px',
    fontWeight: '700',
    height: '46px',
    left: '171px',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    textAlign: 'center',
    top: '50px',
    width: '171px',
    borderRadius: '5px',
  },
});

export default function App() {
  return (
    <div style={home.frame_frame_wrapper}>
      <div style={home.frame_frame}>
        <div style={home.frame_overlap}>
          <div style={home.frame_rectangle} />
          <img style={home.frame_ucfgym} src={UCFGym} />
        </div>
        <div style={home.frame_message}>
          <div style={home.frame_overlap_group}>
            <div style={home.frame_rectangle_3} />
            <img style={home.frame_polygon} src={polygon} />
            <h1 style={home.frame_text_wrapper}>Find the perfect workouts to meet your goals!</h1>
          </div>
        </div>
        <button type="button" style={home.frame_div}>Enter Data</button>
        <button type="button" style={home.frame_text_wrapper_2}>Chat with Personal Trainer</button>
      </div>
    </div>
  );
};

///data styles and component code
const data = StyleSheet.create({
  data_data_wrapper: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  data_data: {
    backgroundColor: '#ffffff',
    border: '1px none',
    height: '812px',
    position: 'relative',
    width: '375px',
  },

  data_back_arrow: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    height: '23px',
    left: '25px',
    position: 'absolute',
    top: '73px',
    transform: 'rotate(40deg)',
    width: '20px',
  },

  data_rectangle: {
    backgroundColor: '#000000',
    height: '3px',
    left: '0',
    position: 'absolute',
    top: '20px',
    width: '20px',
  },

  data_rectangle_3: {
    backgroundColor: '#000000',
    height: '3px',
    left: '-9px',
    position: 'absolute',
    top: '9px',
    transform: 'rotate(-90deg)',
    width: '20px',
  },

  data_height: {
    height: '49px',
    left: '41px',
    position: 'absolute',
    top: '183px',
    width: '136px',
  },

  data_text_wrapper: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    left: '0',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    top: '0',
    width: '50px',
  },

  data_feet: {
    backgroundColor: '#d9d9d9',
    border: '0',
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    height: '24px',
    left: '0',
    letterSpacing: '0',
    lineHeight: 'normal',
    padding: '0',
    position: 'absolute',
    textAlign: 'center',
    top: '25px',
    width: '49px',
  },

  data_div: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    height: '24px',
    left: '50px',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    top: '25px',
    width: '18px',
  },

  data_in: {
    backgroundColor: '#d9d9d9',
    border: '0',
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    height: '24px',
    left: '68px',
    letterSpacing: '0',
    lineHeight: 'normal',
    padding: '0',
    position: 'absolute',
    textAlign: 'center',
    top: '25px',
    width: '37px',
  },

  data_text_wrapper_2: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    height: '24px',
    left: '105px',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    top: '25px',
    width: '21px',
  },

  data_weight: {
    height: '49px',
    left: '41px',
    position: 'absolute',
    top: '272px',
    width: '93px',
  },

  data_text_wrapper_3: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    left: '0',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    top: '0',
    width: '53px',
  },

  data_input: {
    backgroundColor: '#d9d9d9',
    border: '0',
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    height: '24px',
    left: '0',
    letterSpacing: '0',
    lineHeight: 'normal',
    padding: '0',
    position: 'absolute',
    textAlign: 'center',
    top: '25px',
    width: '57px',
  },

  data_text_wrapper_4: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    height: '24px',
    left: '57px',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    textAlign: 'center',
    top: '25px',
    width: '30px',
  },

  data_gender: {
    height: '49px',
    left: '41px',
    position: 'absolute',
    top: '361px',
    width: '168px',
  },

  data_p: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    left: '0',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    top: '0',
    width: '164px',
  },

  data_h_1: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '25px',
    fontWeight: '700',
    left: '154px',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    textAlign: 'center',
    top: '107px',
    width: '67',
  },
});

function Data() {
  return (
    <div style={data.data_data_wrapper}>
      <div style={data.data_data}>
        <button type="button" style={data.data_back_arrow}>
          <div style={data.data_rectangle} />
          <div style={data.data_rectangle_3} />
        </button>
        <div style={data.data_height}>
          <div style={data.data_text_wrapper}>Height</div>
          <input style={data.data_feet} />
          <div style={data.data_div}>ft.</div>
          <input style={data.data_in} />
          <div style={data.data_text_wrapper_2}>in.</div>
        </div>
        <div style={data.data_weight}>
          <div style={data.data_text_wrapper_3}>Weight</div>
          <input style={data.data_input} />
          <div style={data.data_text_wrapper_4}>lbs.</div>
        </div>
        <div style={data.data_gender}>
          <div style={data.data_p}>Gender (enter M or F)</div>
          <input style={data.data_input} />
        </div>
        <h1 style={data.data_h_1}>Data</h1>
      </div>
    </div>
  );
}

//chat styles and component code
const chat = StyleSheet.create({
  PT_PT_wrapper: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  PT_PT: {
    backgroundColor: '#ffffff',
    border: '1px none',
    height: '812px',
    overflow: 'hidden',
    width: '375px',
  },

  PT_overlap: {
    height: '168px',
    left: '0',
    position: 'relative',
    width: '380px',
  },

  PT_heading: {
    height: '168px',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '380px',
  },

  PT_overlap_group: {
    backgroundColor: '#00000040',
    boxShadow: '0px 5px 8px #00000080',
    height: '168px',
    position: 'relative',
    width: '376px',
  },

  PT_overlap_group1: {
    backgroundColor: '#ffcc00',
    borderRadius: '40px',
    height: '80px',
    left: '149px',
    position: 'absolute',
    top: '51px',
    width: '80px',
  },

  PT_text_wrapper: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '43px',
    fontWeight: '400',
    height: '51px',
    left: '11px',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    textAlign: 'center',
    top: '14px',
    width: '59px',
  },

  PT_div: {
    color: '#000000',
    fontFamily: '\"Inter\", Helvetica',
    fontSize: '16px',
    fontWeight: '400',
    left: '127px',
    letterSpacing: '0',
    lineHeight: 'normal',
    position: 'absolute',
    textAlign: 'center',
    top: '136px',
    width: '125px',
  },
});

function Chat () {
  return (
    <div style={chat.PT_PT_wrapper}>
      <div style={chat.PT_PT}>
        <div style={chat.PT_overlap}>
          <div style={chat.PT_heading}>
            <div style={chat.PT_overlap_group}>
              <div style={chat.PT_overlap_group1}>
                <div style={chat.PT_text_wrapper}>PT</div>
              </div>
              <div style={chat.PT_div}>Personal Trainer</div>
            </div>
          </div>
          <button type="button" style={data.data_back_arrow}>
            <div style={data.data_rectangle} />
            <div style={data.data_rectangle_3} />
          </button>
        </div>
      </div>
    </div>
  );
}
