import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/layout/Layout';
import WarningCard from '../components/WarningCard';
import Card from '../components/Card';

const dummyCards = [
    {
      title: "Temperature",
      value: 26,
      unit: "°C",
      icon: "thermometer",
      color: "#FF7043",
    },
    {
      title: "Heart Rate",
      value: 72,
      unit: "bpm",
      icon: "heart-pulse",
      color: "#E53935",
    },
    {
      title: "Humidity",
      value: 55,
      unit: "%",
      icon: "water-percent",
      color: "#42A5F5",
    },
    {
      title: "Steps",
      value: 1200,
      unit: "steps",
      icon: "walk",
      color: "#66BB6A",
    },
  ];
  
const HomeScreen = () => {
    const { theme } = useTheme(); // Get theme
    return (
        <Layout scrollable>
            <View>
                <WarningCard
                    title="High Temperature"
                    message="Please stay hydrated and take breaks regularly."
                    icon="weather-sunny-alert"
                    color="red" 
                />

            {dummyCards.map((item, index) => (
                <Card
                key={index}
                title={item.title}
                value={item.value}
                unit={item.unit}
                icon={item.icon}
                color={item.color}
                />
            ))}
            </View>
        </Layout>
    )
}

export default HomeScreen

{/* <View>
<WarningCard
    title="High Temperature"
    message="Please stay hydrated and take breaks regularly."
    icon="weather-sunny-alert"
    color="red" 
/>

<Card
title="Temperature"
value={26}
unit="°C"
icon="thermometer"
color="#FF7043"
/>

<Card
title="Heart Rate"
value={72}
unit="bpm"
icon="heart-pulse"
color="#E53935"
/>

<Card
title="Humidity"
value={55}
unit="%"
icon="water-percent"
color="#42A5F5"
/>

<Card
title="Steps"
value={1200}
unit="steps"
icon="walk"
color="#66BB6A"
/>

</View> */}

const styles = StyleSheet.create({})

// import { StyleSheet, Text, View } from 'react-native'
// import { useTheme } from '../context/ThemeContext';
// import Card from '../components/Card';
// import Layout from '../components/layout/Layout';
// import WarningCard from '../components/WarningCard';

//   {/* <Text style={theme.textStyles.titleLarge}>Overview</Text>
//                 <Text style={theme.textStyles.titleMedium}>Lorem ipsum</Text>
//                 <Text style={theme.textStyles.titleSmall}>Lorem ipsum</Text>
//                 <Text style={theme.textStyles.unitLarge}>44<Text style={theme.textStyles.unitSmall}> %</Text></Text>
//                 <Text style={theme.textStyles.titleBody}>
//                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
//                     Porro, fugit voluptatem perferendis temporibus consectetur quibusdam veritatis. 
//                     Aperiam voluptates similique debitis.
//                 </Text>  */}

