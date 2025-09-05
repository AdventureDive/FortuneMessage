import React from "react";
import {
    Animated,
    ImageBackground,
    ScrollView,
    StyleSheet,
    useAnimatedValue,
    useWindowDimensions,
    View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const calendar = require("../assets/images/calendar.png");
const budget = require("../assets/images/budget.png");
const activity = require("../assets/images/activity.png");
const notepad = require("../assets/images/notepad.png");
// const images = new Array(6).fill(
//     'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
// );
const images = new Array(6).fill(
    calendar
);

const ImageInfoSlider = () => {
    const animations = new Array();
    const animation1 = require("../assets/images/animations/Brainstorming.json");
    const animation2 = require("../assets/images/animations/Celebrations Begin.json");
    const animation3 = require("../assets/images/animations/Task Loader.json");
    const animation4 = require("../assets/images/animations/result page success motion design.json");
    animations.push(animation1, animation2, animation3, animation4);

    const svgs = new Array();
    const svg1 = calendar;
    const svg2 = budget;
    const svg3 = activity;
    const svg4 = notepad;
    svgs.push(svg1, svg2, svg3, svg4);
    const scrollX = useAnimatedValue(0);

    const { width: windowWidth } = useWindowDimensions();
    const { height: windowHeight } = useWindowDimensions();

    const ScrollHandler = () => {
        Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        x: scrollX,
                    },
                },
            },
        ], { useNativeDriver: true })
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={ScrollHandler}
                        scrollEventThrottle={1}
                    >

                        {svgs.map((svg, imageIndex) => {

                            return (
                                <View
                                    style={{
                                        width: windowWidth,
                                        // height: 250
                                        height: windowHeight * 0.2,

                                    }}
                                    key={imageIndex}
                                >
                                    {/* <LottieView source={animations[imageIndex]} autoPlay loop /> */}
                                    <ImageBackground source={svg} style={styles.card}>
                                        <View style={styles.textContainer}>
                                            {/* <Text style={styles.infoText}>
                                                {'Image - ' + imageIndex}
                                            </Text> */}
                                        </View>

                                    </ImageBackground>
                                </View>
                            );
                        })}


                    </ScrollView>
                    <View style={styles.indicatorContainer}>
                        {images.map((image, imageIndex) => {
                            const width = scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1),
                                ],
                                outputRange: [8, 16, 8],
                                extrapolate: 'clamp',
                            });
                            return (
                                <Animated.View
                                    key={imageIndex}
                                    style={[styles.normalDot, { width }]}
                                />
                            );
                        })}
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        // marginVertical: 4,
        // marginHorizontal: 16,
        marginBottom: 10,
        borderRadius: 5,
        // overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textContainer: {
        // backgroundColor: 'rgba(0,0,0, 0.3)',
        backgroundColor: 'transparent',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
    },
    infoText: {
        color: 'steelblue',
        fontSize: 20,
        fontWeight: 'bold',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'magenta',
        marginVertical: 4,
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ImageInfoSlider;