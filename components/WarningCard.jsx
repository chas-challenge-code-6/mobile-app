import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const warningTypes = {
  heat: {
    icon: 'weather-sunny-alert',
    color: '#D32F2F',
    message: 'High temperatures today. Stay hydrated and take breaks.',
  },
  uv: {
    icon: 'weather-sunny',
    color: '#FFA000',
    message: 'UV levels are high. Use sun protection.',
  },
  pollen: {
    icon: 'flower',
    color: '#689F38',
    message: 'Pollen levels are elevated. Be cautious outdoors.',
  },
  wind: {
    icon: 'weather-windy',
    color: '#0288D1',
    message: 'Strong winds expected. Watch for debris.',
  },
  default: {
    icon: 'alert-circle',
    color: 'red',
    message: 'Please be cautious and stay informed.',
  },
};

const WarningCard = ({
  title = 'Warning',
  message,
  icon,
  color,
  type = 'default',
}) => {
  const { theme } = useTheme();

  const warning = warningTypes[type] || warningTypes.default;

  return (
    <View style={[styles.cardContainer, { borderLeftColor: color || warning.color }]}>
      <MaterialCommunityIcons
        name={icon || warning.icon}
        size={32}
        color={color || warning.color}
        style={styles.icon}
      />
      <View style={styles.messageContainer}>
        <Text style={theme?.textStyles?.titleMedium || styles.title}>
          {title}
        </Text>
        <Text style={theme?.textStyles?.textBody || styles.message}>
          {message || warning.message}
        </Text>
      </View>
    </View>
  );
};

export default WarningCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderLeftWidth: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#444',
  },
});



// import { View, Text, StyleSheet } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useTheme } from '../context/ThemeContext';

// const WarningCard = ({
//   title = "Warning",
//   message = "Something requires your attention.",
//   icon = "alert-circle",
//   color = "red",
// }) => {
//   const { theme } = useTheme(); // Används bara för textStyles här

//   return (
//     <View style={[styles.cardContainer, { borderLeftColor: color }]}>
//       <MaterialCommunityIcons
//         name={icon}
//         size={32}
//         color={color}
//         style={styles.icon}
//       />
//       <View style={styles.messageContainer}>
//         <Text style={theme.textStyles.titleMedium || styles.title}>
//           {title}
//         </Text>
//         <Text style={theme.textStyles.textBody || styles.message}>
//           {message}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default WarningCard;

// const styles = StyleSheet.create({
//   cardContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     borderLeftWidth: 6,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginBottom: 16,
//     alignItems: 'center',
//     elevation: 2, // för Android shadow
//     shadowColor: '#000', // för iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   icon: {
//     marginRight: 12,
//   },
//   messageContainer: {
//     flex: 1,
//   },
//   title: {
//     fontWeight: '600',
//     fontSize: 16,
//     marginBottom: 4,
//     color: '#333',
//   },
//   message: {
//     fontSize: 14,
//     color: '#444',
//   },
// });


// const WarningCard = () => {
//     const { theme } = useTheme();
//     return (
//         <View style={theme.warningCard}>
//             <View style={theme.warningStripe} />
//             <MaterialCommunityIcons
//                 name="alert-circle"
//                 size={28}
//                 color="red"
//                 style={theme.icon}
//             />
//             <View style={theme.warningContent}>
//                 <Text style={theme.textStyles.titleMedium}>Warning</Text>
//                 <Text style={theme.textStyles.textBody}>
//                 High temperatures today. Remember to stay hydrated and take breaks.
//                 </Text>
//             </View>
//         </View>

//         );
// }

// export default WarningCard