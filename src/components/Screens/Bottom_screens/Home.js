import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import uuid from 'react-native-uuid'; // For generating anonymous IDs

import React, {useState} from 'react';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const Home = () => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const generateUserId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit ID
};
const [posts, setPosts] = useState([
  { id: '1', content: 'XYZ Company has great work-life balance, but could improve management transparency.', category: 'Company', likes: 0, likedByUser: false },
  { id: '2', content: 'ABC High School provides excellent education but needs to update its facilities.', category: 'School', likes: 0, likedByUser: false },
  { id: '3', content: 'John Doe (Manager at ABC Ltd) is supportive, but micromanages the team.', category: 'Manager', likes: 0, likedByUser: false },
  { id: '4', content: 'DEF University has an amazing campus, but the administration is slow to respond to student concerns.', category: 'University', likes: 0, likedByUser: false },
  { id: '5', content: 'GHI Corporation offers excellent career growth opportunities, but their benefits package could be better.', category: 'Company', likes: 0, likedByUser: false },
  { id: '6', content: 'LMN School has an inclusive environment, but more extracurricular activities would be beneficial.', category: 'School', likes: 0, likedByUser: false },
  { id: '7', content: 'Sarah Lee (Manager at XYZ Inc) fosters innovation, but often sets unrealistic deadlines.', category: 'Manager', likes: 0, likedByUser: false },
  { id: '8', content: 'PQR College has a fantastic engineering department, but housing options for students are limited.', category: 'University', likes: 0, likedByUser: false },
]);
const userId = generateUserId();  // Generates a 6-digit random ID

  // const userId = uuid.v4(); // This can be replaced by your logged-in user ID if available
  const toggleLike = postId => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          // Toggle the like state
          const likedByUser = !post.likedByUser;
          const likes = likedByUser ? post.likes + 1 : post.likes - 1;

          return {
            ...post,
            likes: likes > 0 ? likes : 0, // Ensure likes don't go below 0
            likedByUser,
          };
        }
        return post;
      });
    });
  };

  // Render each post item
  const renderItem = ({item}) => (
    <View style={{alignItems: 'center'}}>
      <View style={{width: width * 0.95}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image
              style={{width: 20, height: 20, borderRadius: 20}}
              source={require('../../../assets/images/profile.png')}></Image>
            <View style={{marginLeft: 10}}>
              <Text style={styles.t_text}>User{userId}</Text>
              <Text style={styles.t2_text}>{'22-10-2024'}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image
              style={{width: 20, height: 20, borderRadius: 20}}
              source={require('../../../assets/images/dots.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.postCategory}>Category: {item.category}</Text>
          <Text style={styles.postContent}>{item.content}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => toggleLike(item.id)}
              style={styles.likeButton}>
             {/* <Text>{item.likes}</Text> */}
              {
                item.likedByUser ? (
                  <>
                    <Image
                      style={{width: 20, height: 20, }}
                      source={require('../../../assets/images/like.png')}></Image>
                  </>
                ):(<>
                  <Image
                      style={{width: 20, height: 20, }}
                      source={require('../../../assets/images/dislike.png')}></Image>
                </>)
              }
              <Text
                style={[styles.likeText, item.likedByUser && {color: 'blue'}]}>
                {item.likedByUser ? 'Unlike' : 'Like'} ({item.likes})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
        <View style={{width: width * 0.95}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Image
              style={{width: 35, height: 35}}
              source={require('../../../assets/images/user.png')}></Image>

              <View style={{flexDirection:'row',alignItems:'center'}}>

              <TouchableOpacity style={{marginRight:30}}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/images/team.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/images/bell.png')}></Image>
            </TouchableOpacity>
              </View>
      
          </View>
        </View>
      </View>

      <View style={{marginTop:20}}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 100}}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}>
          <TouchableOpacity>
        <Image
          style={{width: 50, height: 50}}
          source={require('../../../assets/images/add.png')}></Image>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  postContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
    marginTop:10
  },
  likeButton: {
    flexDirection:'row',alignItems:'center'
    // padding: 10,
    // backgroundColor: '#f0f0f0',
    // borderRadius: 5,
  },
  likeText: {
    fontSize: 14,
    color: '#333',
  },
  t_text: {
    color: '#000',
    fontSize:12,

  },
  t2_text:{
    color: 'grey',
    fontSize:9,
  }
});
