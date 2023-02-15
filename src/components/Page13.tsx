import { Alert, AlertDialog, ArrowBackIcon, ArrowForwardIcon, Badge, Box, Button, Center, CheckIcon, FormControl, HStack, Icon, Image, Input, PresenceTransition, Progress, Slider, Text, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Spinner from "react-native-loading-spinner-overlay"
import { Dimensions } from "react-native";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPatientPostFeelings } from "../redux/actions/setPatientPostFeelings";
import { setProg } from "../redux/actions/setProg";

import firestore from "@react-native-firebase/firestore";
import { unsetAutoTherm } from "../redux/actions/unsetAutoTherm";
import { unsetPatient } from "../redux/actions/unsetPatient";
import { unsetTherapy } from "../redux/actions/unsetTherapy";
import Sound from "react-native-sound";


export const Page13 = () => {
    const patientName = useSelector(store => store.patient.name);
    const patientID = useSelector(store => store.patient.id);
    const patientGender = useSelector(store => store.patient.gender);
    const patientAge = useSelector(store => store.patient.age);
    const patientDOP = useSelector(store => store.patient.dop);
    const patientVASValueAVG = useSelector(store => store.patient.VASValueAVG);
    const patientVASValueMin = useSelector(store => store.patient.VASValueMin);
    const patientVASValueMax = useSelector(store => store.patient.VASValueMax);
    const patientSufferingDuration = useSelector(store => store.patient.sufferingDuration);
    const patientPostFeelings = useSelector(store => store.patient.postFeelings);

    const temperature = useSelector(store => store.therapy.temperature)
    const duration = useSelector(store => store.therapy.duration)



    const [VASValue, setVASValue] = useState(useSelector(store => store.patient.postFeelings))
    const [VASValueError, setVASValueError] = useState("");

    const [isPostingToCloud, setIsPostingToCloud] = useState(false)
    const [isDataSaved, setIsDataSaved] = useState(false)

    const [color, setColor] = useState("primary");

    const [painText, setPainText] = useState("No pain");
    const [painTextColor, setPainTextColor] = useState("primary");

    const [shouldPostData, setShouldPostData] = useState(false);

    // initialize firebase
    const autoTherm = firestore().collection('patient_data')

    const handleVASValue = (text) => {
        setVASValue(text);
        let pain = parseInt(text);
        if (pain == 0) {
            setColor("pimary");
            setPainTextColor("primary");
            setPainText("No pain")
        }
        else if (pain >= 1 && pain <= 3) {
            setColor("emerald"); setPainTextColor("success");
            setPainText("Mild");
        }
        else if (pain >= 4 && pain <= 6) {
            setColor("indigo"); setPainTextColor("warning");
            setPainText("Moderate");
        }
        else {
            setColor("orange");
            setPainTextColor("error");
            setPainText("Severe");
        }
    }
    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch();

    Sound.setCategory("Playback");
    const success = new Sound("success.wav", Sound.MAIN_BUNDLE);

    const saveToFirestore = async ({ id, name, gender, age, disease_or_problem, face_pain_avg, face_pain_min, face_pain_max, suffering_duration, temperature, duration, post_face_pain }) => {
        try {
            const save = await autoTherm
                .add({
                    id,
                    name,
                    gender,
                    age,
                    disease_or_problem,
                    face_pain_avg,
                    face_pain_min,
                    face_pain_max,
                    suffering_duration,
                    temperature,
                    duration,
                    post_face_pain,
                    created_at: firestore.FieldValue.serverTimestamp()
                });
            console.log(save.id);
            return save.id;
        } catch (e) {
            return undefined;
        }
    }


    const handleNext = async () => {
        try {
            dispatch(setPatientPostFeelings(VASValue)); // necessary?
            setIsPostingToCloud(true); // show overlay spinner
            const id = await saveToFirestore({
                id: patientID,
                name: patientName,
                gender: patientGender,
                age: patientAge,
                disease_or_problem: patientDOP,
                face_pain_avg: patientVASValueAVG,
                face_pain_min: patientVASValueMin,
                face_pain_max: patientVASValueMax,
                suffering_duration: patientSufferingDuration,
                temperature,
                duration,
                post_face_pain: VASValue
            });
            console.log(id);
            setIsDataSaved(true);
            dispatch(setProg(13)); // set progress to 100%
            // setShouldPostData(true); // trigger post
            success.play();
        } catch (err) {
            setIsDataSaved(false);
            console.log(err);
            dispatch(setProg(12));
        } finally {
            setShowDialog(true);  // show message
            setIsPostingToCloud(false); // hide spinner
        }
    }
    // useEffect(()=>{
    //     (async ()=>{
    //         if (shouldPostData &&
    //             patientName.length > 0 &&
    //             patientID.length > 0 &&
    //             patientGender.length > 0 &&
    //             patientAge.length > 0 &&
    //             patientDOP.length > 0 &&
    //             patientSufferingDuration.length > 0
    //             ) {
    //                 try {
    //                     const id = await saveToFirestore({
    //                         id: patientID,
    //                         name: patientName,
    //                         gender: patientGender,
    //                         age: patientAge,
    //                         disease_or_problem: patientDOP,
    //                         face_pain_avg: patientVASValueAVG,
    //                         face_pain_min: patientVASValueMin,
    //                         face_pain_max: patientVASValueMax,
    //                         suffering_duration: patientSufferingDuration,
    //                         temperature,
    //                         duration,
    //                         post_face_pain: patientPostFeelings
    //                     })
    //                     setIsDataSaved(true);
    //                 } catch (err) {
    //                     console.log(err);
    //                     setProg(12);
    //                     setIsDataSaved(false);
    //                 } finally {
    //                     setShowDialog(true);  // show message
    //                     setIsPostingToCloud(false); // hide spinner

    //                     setShouldPostData(false);
    //                 }
    //             }
    //     })()
    // }, [shouldPostData, patientName, patientID, patientGender, patientAge, patientDOP, patientSufferingDuration])
    const handleYes = () => {
        setShowDialog(false);
        // unset states
        dispatch(unsetAutoTherm());
        dispatch(unsetPatient());
        dispatch(unsetTherapy());
    }
    const handleNo = () => {
        BackHandler.exitApp();
    }
    const cancelRef = useRef(null);
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Spinner
                visible={isPostingToCloud}
                textContent="Sending data to cloud..."
                textStyle={{ color: "#e0e0e0" }}
            />
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={showDialog}>
                <AlertDialog.Content>
                    <AlertDialog.Header>{isDataSaved ? "Success" : "Failure"}</AlertDialog.Header>
                    <AlertDialog.Body>
                        {
                            isDataSaved ?
                                <Alert variant="subtle" status="success">
                                    <HStack space={2} flexShrink={1}>
                                        <Alert.Icon mt={1} />
                                        <Text>Data saved successfully</Text>
                                    </HStack>
                                </Alert> :
                                <Alert variant="subtle" status="error">
                                    <HStack space={2} flexShrink={1}>
                                        <Alert.Icon mt={1} />
                                        <Text>Failed to save data</Text>
                                    </HStack>
                                </Alert>
                        }
                        <Alert mt={2} variant="subtle" status="info">
                            <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt={1} />
                                <Text>Do you want to continue with another patient?</Text>
                            </HStack>
                        </Alert>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button onPress={handleYes} leftIcon={<Icon as={<MaterialIcons name="redo" />} />} colorScheme="primary" variant="outline">
                                Yes
                            </Button>
                            <Button onPress={handleNo} leftIcon={<Icon as={<MaterialIcons name="close" />} />} colorScheme="danger" variant="outline">No</Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
            <Text fontSize="2xl">Face Pain Scale</Text>
            <PresenceTransition visible initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                <FormControl isRequired isInvalid={VASValueError.length > 0}>
                    <FormControl.Label _text={{ bold: true }}>
                        What about now compared to previous measurements?
                    </FormControl.Label>
                    <HStack>
                        <Text>0</Text>
                        <Text ml="auto">10</Text>
                    </HStack>
                    <Slider colorScheme={painTextColor} size="lg" defaultValue={VASValue} minValue={0} maxValue={10} step={1} onChange={handleVASValue}>
                        <Slider.Track>
                            <Slider.FilledTrack />
                        </Slider.Track>
                        <Slider.Thumb />
                    </Slider>
                    <Center>
                        <Text mt={5}>
                            {VASValue}
                        </Text>

                        <Badge mt={5} colorScheme={painTextColor} variant="outline" _text={{ fontSize: 25 }}>
                            {painText}
                        </Badge>

                    </Center>
                    <Box>
                        <FormControl.ErrorMessage>{VASValueError}</FormControl.ErrorMessage>
                        <Center>
                            <Image resizeMode="contain" width={Dimensions.get('window').width} height={200} alt="Face Pain Scale" source={require('./images/Pain_scale.jpg')} />
                        </Center>
                    </Box>
                </FormControl>
            </PresenceTransition>
            <FormControl pt={2}>
                <Button.Group>
                    <Button
                        leftIcon={<ArrowBackIcon />}
                        colorScheme="primary"
                        isDisabled
                    >Back</Button>
                    <Button
                        ml="auto"
                        rightIcon={<Icon as={<MaterialIcons name="send" />} />}
                        colorScheme="primary"
                        isDisabled={isPostingToCloud}
                        onPress={handleNext}
                    >Submit</Button>
                </Button.Group>
            </FormControl>
        </VStack>
    )
}