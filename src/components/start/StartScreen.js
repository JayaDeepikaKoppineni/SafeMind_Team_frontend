import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Medtation from './Medtation';
import Journaling from './Journaling';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem from './CarouselCardItem';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import MultiAccordion from 'react-native-multi-flow-accordion';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const StartScreen = ({navigation, handleLogin}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const datafaq = [
    {
      question: 'What Is Mindful Self-Reflection?',
      answer:
        'To self-reflect is to take the time to inquire more deeply into our experience. Also referred to as introspection, it asks us to examine our thoughts, our feelings, our assumptions, and our judgments, a process which helps us to grow.',
     
    },
    {
      question: 'The Benefits of Mindful Self-Reflection',
      answer:
        'We do not need to reach the deepest practice of self-enquiry in order to experience the benefits of mindful self-reflection. As mentioned, mindful self-reflection has a range of benefits. For instance, it can:',
     
    },
    {
      question: 'When to meditate?',
      answer:
        'Generally speaking, the best time to meditate is early morning, right after a trip to the bathroom but before breakfast. Having said that, any time that fits your schedule is good, and the most important thing is to choose a time when you are more likely to actually do it.',
     
    },
    {
      question: 'Where to meditate?',
      answer:
        'Meditating always in the same place and time is a good help in focusing the mind. Your brain associates that place with the practice, so it is easier for you to focus. There is less distraction involved.',
     
    },
  ];
  const data = [
    {
      id: 1,
      title: '5 Visualization Techniques to Add to Your Meditation Practice',
      body: 'Looking to up your meditation game? Try adding a little visualization into the mix.',
      link: 'https://www.healthline.com/health/visualization-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med1.jpg'),
    },
    {
      id: 2,
      title: 'Exploring the Benefits of Meditation for Anxietys',
      body: 'We ll explore the evidence that meditation is a great treatment for anxiety and show you how to get started.',
      link: 'https://www.healthline.com/health/anxiety/meditation-for-anxiety?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med2.jpg'),
    },
    {
      id: 3,
      title: 'How Meditation Benefits Your Mind and Body',
      body: 'Meditation is the process of redirecting your thoughts to calm your mind. It may also improve your overall quality of life. This is what the research…',
      link: 'https://www.healthline.com/nutrition/12-benefits-of-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med3.jpg'),
    },
    {
      id: 4,
      title: 'What Is Breathwork Meditation?',
      body: 'Breathwork meditation has many mental health benefits and its never too late to learn.',
      link: 'https://www.healthline.com/health/breath-work-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med4.jpg'),
    },
  ];

  const dataJOurling = [
    {
      id: 1,
      title: 'What Is Breathwork Meditation?',
      body: 'Breathwork meditation has many mental health benefits and its never too late to learn.',
      link: 'https://www.healthline.com/health/breath-work-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med4.jpg'),
    },
    {
      id: 2,
      title: '5 Visualization Techniques to Add to Your Meditation Practice',
      body: 'Looking to up your meditation game? Try adding a little visualization into the mix.',
      link: 'https://www.healthline.com/health/visualization-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med1.jpg'),
    },

    {
      id: 3,
      title: 'How Meditation Benefits Your Mind and Body',
      body: 'Meditation is the process of redirecting your thoughts to calm your mind. It may also improve your overall quality of life. This is what the research…',
      link: 'https://www.healthline.com/nutrition/12-benefits-of-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med3.jpg'),
    },

    {
      id: 4,
      title: 'Exploring the Benefits of Meditation for Anxietys',
      body: 'We ll explore the evidence that meditation is a great treatment for anxiety and show you how to get started.',
      link: 'https://www.healthline.com/health/anxiety/meditation-for-anxiety?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med2.jpg'),
    },
  ];

  const databenfits = [
    {
      id: 1,
      imgUrl: require('../../assets/images/ben1.jpg'),
    },
    {
      id: 2,
      imgUrl: require('../../assets/images/ben2.jpg'),
    },
    {
      id: 3,
      imgUrl: require('../../assets/images/ben3.jpg'),
    },
  ];


  const [handleclick, sethandleclick] = useState('Medition');

  const changeoption = text => {
    sethandleclick(text);
  };

  const works = () => {};

  const openarticle = async link => {
    InAppBrowser.close();

    try {
      const url = link;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // Android Properties
          showTitle: true,
          toolbarColor: '#000',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          showInRecents: true,
        }).then(async result => {
          console.log('then erorrrrrrrrrrrrrr');
          navigation.navigate('Bottomnavbar');
        });
      }
    } catch (e) {
      console.log('then erorrrrrrrrrrrrrr');
      navigation.navigate('Bottomnavbar');
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: width * 0.95}}>
          <View style={styles.container1}>
            <Image source={item.imgUrl} style={styles.image1} />
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                overflow: 'hidden',
                marginLeft: 10,
                width: width * 0.6,
              }}
              onPress={() => openarticle(item.link)}>
              <Text style={styles.header1}>{item.title}</Text>
              <Text style={styles.body1}>{item.body}</Text>
              <View>
                <View>
                  <Text
                    style={{
                      color: 'red',
                      textDecorationLine: 'underline',
                      fontSize: 12,
                    }}>
                    {'Read More>>'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderImage = ({item}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#ccc',
          borderWidth: 1,
          borderColor: '#000',
          marginRight: 5,
        }}>
        <Image source={item.imgUrl} style={{width: 100, height: 100}} />
      </View>
    );
  };
  const howitworks=()=>{
    navigation.navigate('HowitWorks')
  }

  const handleRigister=()=>{
    navigation.navigate('Register')
  }
  const handleLoginpress=()=>{
    navigation.navigate('Login')
  }
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
            <TouchableOpacity onPress={handleLoginpress}>
              <Text style={{color: '#000',textDecorationLine:'underline',fontSize:15}}>Login ?</Text>
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
              <Text style={{color: '#000', fontSize: 15}}>Medition</Text>
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
              <Text style={{color: '#000', fontSize: 15}}>Journaling</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {handleclick == 'Medition' ? (
          <>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingBottom: 0}}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
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
            {/* <Journaling /> */}
            <FlatList
              data={dataJOurling}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingBottom: 0}}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text
          style={{
            color: '#000',
            fontSize: 15,
            fontWeight: '800',
            textDecorationLine: 'underline',
          }}>
          Benfits of SafeMind
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <View style={{width: width * 0.95}}>
          <FlatList
            data={databenfits}
            renderItem={renderImage}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingBottom: 0}}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
     
      <View style={{marginTop: 10, alignItems: 'center'}}>
        <Text style={{color: '#000', fontSize: 15, fontWeight: '800'}}>FAQ</Text>
      </View>
      <MultiAccordion containerStyle={{fontSize:10}} answerTextStyle={{fontSize:10}} questionTextStyle={{fontSize:10}} data={datafaq} />
      


      <View style={{alignItems: 'center',position:'absolute',bottom:25,right:0,left:0}}>
        <TouchableOpacity 
        onPress={handleRigister}
        style={{width: width *0.8, height: 40, backgroundColor: 'blue',alignItems:'center',justifyContent:'center',borderRadius:10}}>
          <View>
            <Text style={{color:'#fff'}}>Get Started</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:10}} onPress={howitworks}>
          <View>
            <Text style={{color:'blue',fontSize:12,textDecorationLine:'underline'}}>How It Works</Text>
          </View>
        </TouchableOpacity>
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
    color: '#000',
  },
  container1: {
    backgroundColor: 'white',
    borderRadius: 8,

    flexDirection: 'row',

    overflow: 'hidden',
    height: 150,
    marginTop: 10,
    borderRightColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
  },
  image1: {
    width: 100,
    height: 'auto',
    objectFit: 'cover',
    // objectFit:
  },
  header1: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  body1: {
    color: '#222',
    fontSize: 10,
  },
});
