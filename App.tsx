import { Center, Input, NativeBaseProvider, TextArea, Box, Progress, SearchIcon } from "native-base";
import { useEffect, useState } from "react";
import { Text } from "react-native-svg";
import { Home } from "./components/Home";
import { Page1 } from "./components/Page1";

import BluetoothSerial from "react-native-bluetooth-serial";
import { Page2 } from "./components/Page2";
import { Page3 } from "./components/Page3";
import { Page4 } from "./components/Page4";
import { Page5 } from "./components/Page5";
import { Page6 } from "./components/Page6";
import { Page7 } from "./components/Page7";
import { Page8 } from "./components/Page8";
import { Page9 } from "./components/Page9";
import { Page10 } from "./components/Page10";
import { Page11 } from "./components/Page11";
import { Page12 } from "./components/Page12";
import { Page13 } from "./components/Page13";

import firestore from "@react-native-firebase/firestore";

const App = () => {
  const autoTherm = firestore().collection('patient_data')

  const [page, setPage] = useState(1);

  const [temp, setTemp] = useState(null);
  const [duration, setDuration] = useState("");

  const [counter, setCounter] = useState(0);
  const [tictoc, setTictoc] = useState(null);

  const handleStart = () => {
    console.log(temp)
    console.log(duration)

    const tictoc = setInterval(() => {
      setCounter((counter) => counter+1);
    }, 1000);
    setTictoc(tictoc);
  }
  useEffect(() => {
    console.log(counter)
    if (counter == parseInt(duration)) {
      console.log("Done")
      setCounter(0);
      setPage(1);
      clearInterval(tictoc);
    }
  }, [counter])

  useEffect(()=>{
    console.log("Hello wold!")
    BluetoothSerial.requestEnable()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    const discoverDevices = async () => {
      const devices = await BluetoothSerial.list();
      console.log(devices)
      // const cnt = await BluetoothSerial.write("hi");
      // console.log(cnt);
    }
    discoverDevices();
    // autoThermRef.add(data)
    // .then(res=>console.log(res))
  }, [])

  const [prog, setProg] = useState(0);
  const [patientName, setPatientName] = useState("");
  const [patientID, setPatientID] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientDOP, setPatientDOP] = useState("");
  const [patientVASValue, setPatientVASValue] = useState(0);
  const [patientMinVASValue, setPatientMinVASValue] = useState(0);
  const [patientMaxVASValue, setPatientMaxVASValue] = useState(undefined);
  const [patientSufferingDuration, setPatientSufferingDuration] = useState("");
  const [temperature, setTemperature] = useState("");
  // const [duration, setDuration] = useState("");
  const [postFeelings, setPostFeelings] = useState(0)



  const data = {
    patientName,
    patientID,
    patientGender,
    patientAge,
    patientDOP,
    patientVASValue,
    patientMinVASValue,
    patientMaxVASValue,
    patientSufferingDuration,
    temperature,
    duration,
    postFeelings
  }

  // useEffect(()=>{console.log(patientName)}, [patientName])

  const resetState = async () => {
    setPatientName("");
    setPatientID("");
    setPatientGender("");
    setPatientAge("");
    setPatientDOP("");
    setPatientVASValue(0); // average
    setPatientMinVASValue(0); // narrows down to 0
    setPatientMaxVASValue(undefined); // undefined
    setPatientSufferingDuration("");
    setTemperature("");
    setPostFeelings(0);

    setPage(1);
    setProg(0);
  }

  const sendToHC06 = async () => {
    const sendTemp = await BluetoothSerial.write(temperature.toString());
    const sendDuration = await BluetoothSerial.write(duration.toString());
    console.log(sendTemp);
    console.log(sendDuration);
  }

  const saveToFirestore = async () => {
    try {
      const save = await autoTherm
                                  .add({
                                    id: patientID,
                                    name: patientName,
                                    gender: patientGender,
                                    age: patientAge,
                                    disease_or_problem: patientDOP,
                                    face_pain_avg: patientVASValue,
                                    face_pain_min: patientMinVASValue,
                                    face_pain_max: patientMaxVASValue,
                                    suffering_duration: patientSufferingDuration,
                                    temperature: temperature,
                                    duration: duration,
                                    post_face_pain: postFeelings 
                                  });
      console.log(save.id);
      return save.id;
    } catch(e) {
      return undefined;
    }
  } 

  return (
    <NativeBaseProvider>
      <Progress rounded="0" colorScheme="primary" value={prog} max={13} />
      <Center>
        {/* {
          page === 0 && <Home setTemp={setTemp} setDuration={setDuration} handleStart={handleStart} data={data}/>
        } */}
        {
          page === 1 && <Page1 setPatientName={setPatientName} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 2 && <Page2 setPatientID={setPatientID} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 3 && <Page3 setPatientGender={setPatientGender} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 4 && <Page4 setPatientAge={setPatientAge} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 5 && <Page5 setPatientDOP={setPatientDOP} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 6 && <Page6 setPatientVASValue={setPatientVASValue} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 7 && <Page7 setPatientMinVASValue={setPatientMinVASValue} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 8 && <Page8 setPatientMaxVASValue={setPatientMaxVASValue} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 9 && <Page9 setPatientSufferingDuration={setPatientSufferingDuration} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 10 && <Page10 setTemperature={setTemperature} setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 11 && <Page11 setDuration={setDuration} setPage={setPage} setProg={setProg} data={data} sendToHC06={sendToHC06}/>
        }
        {
          page == 12 && <Page12 setPage={setPage} setProg={setProg} data={data}/>
        }
        {
          page == 13 && <Page13 setPostFeelings={setPostFeelings} setPage={setPage} setProg={setProg} data={data} saveToFirestore={saveToFirestore} resetState={resetState}/>
        }
      </Center>
      <Center w="100%">
      {/* <Box w="90%" maxW="300px" pt={2}>
        <Progress value={counter} max={duration} />
      </Box> */}
    </Center>
    </NativeBaseProvider>
  );
}

export default App;