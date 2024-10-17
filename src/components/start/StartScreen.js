import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import Medtation from './Medtation';
import Journaling from './Journaling';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem from './CarouselCardItem';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');


const StartScreen = ({navigation, handleLogin}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const data = [
    {
      title: '5 Visualization Techniques to Add to Your Meditation Practice',
      body: 'Looking to up your meditation game? Try adding a little visualization into the mix.',
      // link:'https://www.healthline.com/health/visualization-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med1.jpg'),
    },
    {
      title: 'Exploring the Benefits of Meditation for Anxietys',
      body: 'We ll explore the evidence that meditation is a great treatment for anxiety and show you how to get started.',
      // link:'https://www.healthline.com/health/anxiety/meditation-for-anxiety?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med2.jpg'),
    },
    {
      title: 'How Meditation Benefits Your Mind and Body',
      body: 'Meditation is the process of redirecting your thoughts to calm your mind. It may also improve your overall quality of life. This is what the research…',
      // link:'https://www.healthline.com/nutrition/12-benefits-of-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med3.jpg'),
    },
    {
      title: 'What Is Breathwork Meditation?',
      body: 'Breathwork meditation has many mental health benefits and its never too late to learn.',
      // link:'https://www.healthline.com/health/breath-work-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med4.jpg'),
    },
  
  
  ];
  
  const [handleclick, sethandleclick] = useState('Medition');

  const changeoption = text => {
    sethandleclick(text);
  };

  const works = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', backgroundColor: '#99ff99'}}>
        <View
          style={{
            width: width * 0.95,
            padding: 0,
            marginBottom: 15,
            marginTop: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 25, fontWeight: '800', color: '#000'}}>
              SafeMind
            </Text>
            <TouchableOpacity>
              <Text style={{color:'#000'}}>Register ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 10}}>
        <View
          style={{
            width: width * 0.95,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#b3ecff',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => changeoption('Medition')}
            style={[
              styles.header,
              {
                borderRadius: 20,

                // backgroundColor: '#cccccc'
                backgroundColor:
                  handleclick == 'Medition' ? '#cccccc' : '#b3ecff',
              },
            ]}>
            <View>
              <Text>Medition</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeoption('Journaling')}
            style={[
              styles.header,
              {
                borderRadius: 20,
                backgroundColor:
                  handleclick == 'Journaling' ? '#cccccc' : '#b3ecff',
              },
            ]}>
            <View>
              <Text>Journaling</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View >
        {handleclick == 'Medition' ? (
          <>
            {/* <Medtation /> */}
            {/* <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={width * 0.95}
          itemWidth={width * 0.95}
          onSnapToItem={index => setIndex(index)}
          useScrollView={true}
          autoplay={true}
          loop={true}

        />  */}
          </>
        ) : (
          <>
            <Journaling />
          </>
        )}
      </View>
      <View style={{alignItems:'center',marginTop:10}}>
        <Text style={{color:'#000',fontSize:15,fontWeight:'800'}}>Benfits of SafeMind</Text>
      </View>
      <View>
          
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dottedLine: {
    width: 1, // Thickness of the line
    height: 20, // Height of the dotted line
    borderStyle: 'dotted', // Makes the line dotted
    borderWidth: 1, // Thickness of the dots
    borderColor: '#000', // Color of the dots
    borderRadius: 1, // Adjust this for round dots
  },
  header: {
    width: width * 0.45,
    // backgroundColor: 'blue',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
