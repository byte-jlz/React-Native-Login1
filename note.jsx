import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { EvilIcons, FontAwesome5, Foundation } from '@expo/vector-icons'

const Login = () => {
  return (
    <View style={{ flex: 1 }}>
      
      <View style={styles.container}>
          <>
              <Text></Text>
          </>
      </View>

      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>SnuggleBuds</Text>
      </View>

      <View style = {styles.ImageContainer}>
        <Image 
        style={styles.TheImage}
        source={require('../(tabs)/dogs/388985ed4a559bb06ead5f35d9bc6ed0eaf60238.png')} />

      </View>

      <TouchableOpacity>
        <View style={styles.searchIconContainer}>
          <EvilIcons
          style={styles.searchIcon} 
          name="search" size={50} color="black" />

        </View>
      </TouchableOpacity>


      <View style={{ flex: 1 }}>
        <ScrollView 
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >

        {/* 1st animal ----------------------------------------------------------*/}
          <View style={styles.informationContainer1}>

            <View style={styles.imageContainer1}>
              <Image 
                style={styles.TheImage1}
                source={require('../(tabs)/dogs/Screenshot 2025-09-09 133757.png')} />
            </View>

            <View style={styles.AnimalInfoContainer1}>
              
              <View style={styles.NameAndGenderContainer1}>
                <Text style={styles.Name1}>DogShit</Text> 
                <Foundation 
                  style={styles.GenderIdIcon1}
                  name='male-symbol' size={24} color='blue' />
              </View>
              <View style={styles.OtherinfoContainer1}>
                <Text>Age: 69</Text>
                <Text>Breed: ShitZu</Text>
                <Text>Birthdate: 06-28-2004</Text>
              </View>

              <TouchableOpacity style={styles.editIconIcon1}>
                <FontAwesome5
                name='edit' size={24} color='black' />
              </TouchableOpacity>

            </View>
          </View>
        
        
        {/* 2nd animal ----------------------------------------------------------*/}
          <View style={styles.informationContainer2}>
            
            <View style={styles.imageContainer2}>
              <Image 
                style={styles.TheImage2}
                source={require('../(tabs)/dogs/Screenshot 2025-09-09 133816.png')} />
            </View>

            <View style={styles.AnimalInfoContainer2}>

              <View style={styles.NameAndGenderContainer2}>
                <Text style={styles.Name2}>Hakdog</Text>
                <Foundation 
                  style={styles.GenderIdIcon2}
                  name='male-symbol' size={24} color='blue' />
              </View>
              <View style={styles.OtherinfoContainer2}>
                <Text>Age: 21</Text>
                <Text>Breed: ShitZu</Text>
                <Text>Birthdate: 06-28-2004</Text>
              </View>

              <TouchableOpacity style={styles.editIconIcon2}>
                <FontAwesome5
                name='edit' size={24} color='black' />
              </TouchableOpacity>

            </View>
          </View>


        {/* 3rd animal ----------------------------------------------------------*/}
          <View style={styles.informationContainer3}>
            
            <View style={styles.imageContainer3}>
              <Image 
                style={styles.TheImage3}
                source={require('../(tabs)/dogs/Screenshot 2025-09-09 133757.png')} />
            </View>

            <View style={styles.AnimalInfoContainer3}>

              <View style={styles.NameAndGenderContainer3}>
                <Text style={styles.Name2}>****</Text>
                <Foundation 
                  style={styles.GenderIdIcon3}
                  name='male-symbol' size={24} color='blue' />
              </View>
              <View style={styles.OtherinfoContainer3}>
                <Text>Age: 21</Text>
                <Text>Breed: FuckZu</Text>
                <Text>Birthdate: 06-28-2004</Text>
              </View>

              <TouchableOpacity style={styles.editIconIcon3}>
                <FontAwesome5
                name='edit' size={24} color='black' />
              </TouchableOpacity>

            </View>
          </View>

        {/* 4th animal ----------------------------------------------------------*/}
          <View style={styles.informationContainer4}> 
            
            <View style={styles.imageContainer4}>
              <Image 
                style={styles.TheImage4}
                source={require('../(tabs)/dogs/Screenshot 2025-09-09 133934.png')} />
            </View>
          </View>

        {/* 5th animal ----------------------------------------------------------*/}
          <View style={styles.informationContainer5}> 
            
            <View style={styles.imageContainer5}>
              <Image 
                style={styles.TheImage5}
                source={require('../(tabs)/dogs/Screenshot 2025-09-09 133757.png')} />
            </View>
          </View>

        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //blank
  },
  HeaderContainer: {
    width: 232,
    height: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
    left: 20,
  },
  HeaderText: {
    fontSize: 35,
  },

  ImageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 60,
    left: 315,

  },
  TheImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,

  },
  searchIconContainer: {
    top: 150,
    left: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 8,
    // borderWidth: 2,

  },
  searchIcon: {
    
  },

  // 1st DogShit ----------------------------------
  informationContainer1: {
    flexDirection: "row",
    //position: "absolute",
    top: 200,
    left: 20,
    width: 370,
    height: 128,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: '#FFFAF0',

  },
  imageContainer1: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 21,

    //borderRadius: 8,
    //borderWidth: 2,
  },
  TheImage1: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  AnimalInfoContainer1: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 128,
    width: 150,
    left: 50,
    //padding: 20,

    borderRadius: 8,
    //borderWidth: 2,

  },
  NameAndGenderContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    //borderRadius: 8,
    //borderWidth: 2,
  },
  Name1: {
    //blank
  },
  GenderIdIcon1: {
    marginLeft: 20,
  },
  OtherinfoContainer1: {
    //borderRadius: 8,
    //borderWidth: 2,
  },
  editIconIcon1: {
    position: 'absolute',
    left: 155,
    //borderRadius: 8,
    //borderWidth: 2,
  },

  // 2nd animal ------------------------------------
  informationContainer2: {
    flexDirection: "row",
    position: "absolute",
    top: 370,
    left: 20,
    width: 370,
    height: 128,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: '#FFFAF0',

  },
  imageContainer2: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 21,

    //borderRadius: 8,
    //borderWidth: 2,
  },
  TheImage2: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },

  AnimalInfoContainer2: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 128,
    width: 150,
    left: 50,
    //top: 100,


    //borderRadius: 8,
    //borderWidth: 2,

  },
  NameAndGenderContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    //borderRadius: 8,
    //borderWidth: 2,
  },
  Name2: {
    // blank
  },
  GenderIdIcon2: {
    marginLeft: 20,
  },
  OtherinfoContainer2: {
    //borderRadius: 8,
    //borderWidth: 2,
  },
  editIconIcon2: {
    position: 'absolute',
    left: 155,
    //borderRadius: 8,
    //borderWidth: 2,
  },

    // 3rd animal ------------------------------------
  informationContainer3: {
    flexDirection: "row",
    position: "absolute",
    top: 540,
    left: 20,
    width: 370,
    height: 128,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: '#FFFAF0',

  },
  imageContainer3: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 21,

    //borderRadius: 8,
    //borderWidth: 2,
  },
    TheImage3: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },

  AnimalInfoContainer3: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 128,
    width: 150,
    left: 50,
    //top: 100,


    //borderRadius: 8,
    //borderWidth: 2,

  },
  NameAndGenderContainer3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    //borderRadius: 8,
    //borderWidth: 2,
  },
  Name3: {
    // blank
  },
  GenderIdIcon3: {
    marginLeft: 20,
  },
  OtherinfoContainer3: {
    //borderRadius: 8,
    //borderWidth: 2,
  },
  editIconIcon3: {
    position: 'absolute',
    left: 155,
    //borderRadius: 8,
    //borderWidth: 2,
  },

  //4th Animal ----------------------------------------

  informationContainer4: {
    flexDirection: "row",
    position: "absolute",
    top: 700,
    left: 20,
    width: 370,
    height: 128,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: '#FFFAF0',

  },
    imageContainer4: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 21,

    //borderRadius: 8,
    //borderWidth: 2,
  },
    TheImage4: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },

  //4th Animal ----------------------------------------
  informationContainer5: {
    flexDirection: "row",
    position: "absolute",
    top: 850,
    left: 20,
    width: 370,
    height: 128,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: '#FFFAF0',

  },
    imageContainer5: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 21,

    //borderRadius: 8,
    //borderWidth: 2,
  },
    TheImage5: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },

})

export default Login