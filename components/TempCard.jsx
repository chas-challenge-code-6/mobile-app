import { Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TempCard = ({ title, icon, value }) => {
  const { theme } = useTheme();

  return (
    <View style={theme.card}>
        <MaterialCommunityIcons name="thermometer-lines" size={54} color={theme.colors.secondary} />
        <View style={theme.content}>
        <Text style={theme.textStyles.titleMedium}>{title}</Text>
        <Text style={theme.textStyles.textBody}>{message}</Text>
        </View>
    </View>
  );
};

export default TempCard;

// import { StyleSheet, Text, View } from 'react-native'
// import { useTheme } from '../context/ThemeContext';

// const TempCard = ({title, content}) => {
//     const { theme } = useTheme();
//     const styles = createStyles(theme);

//     return (
//         // <View style={styles.card}></View>
//         <View style={theme.card}>
//             <Text style={theme.titleLarge}>Test</Text>
//         </View>
//     )
// }

// export default TempCard

// const createStyles = (theme) =>
//     StyleSheet.create({
//         card: {
//             backgroundColor: theme.headerBackground,
//             borderColor: theme.border,
//             borderWidth: 1,
//             padding: 12,
//             marginBottom: 12,
//         }

//     })