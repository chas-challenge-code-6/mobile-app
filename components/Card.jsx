import { Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Card = ({ title, value, unit, icon = "thermometer-lines", color = "#888" }) => {
  const { theme } = useTheme();

  return (
    <>
      <Text style={theme.textStyles.titleMedium}>{title}</Text>
      <View style={theme.card}>
        <MaterialCommunityIcons
          name={icon}
          size={48}
          color={color}
          style={theme.icon}
        />
        <Text style={theme.textStyles.unitLarge}>
          {value}
          <Text style={theme.textStyles.textBody}> {unit}</Text>
        </Text>
      </View>
    </>
  );
};

export default Card;
