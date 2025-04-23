import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/layout/Layout';
import TempCard from '../components/TempCard';
import WarningCard from '../components/WarningCard';

const TempScreen = () => {
	const { theme } = useTheme();

  	return (
		<Layout scrollable>
			<View>
				{/* <Text style={theme.textStyles.titleLarge}>Temperature</Text>
				<WarningCard
					title="High Temperature"
					message="Please stay hydrated and take breaks regularly."
					icon="weather-sunny-alert"
					color="#D32F2F"
				/> */}
		<WarningCard type="heat" title="Hot Today!" />
<WarningCard type="pollen" title="Pollen Alert" />
<WarningCard type="uv" />
<WarningCard type="wind" title="Wind Warning" />
<WarningCard title="Custom Alert" icon="fire" color="#e53935" message="Custom fire warning." />
				<Text style={theme.textStyles.titleMedium}>Averages</Text>
			</View>
    	</Layout>
  	)
}

export default TempScreen

const styles = StyleSheet.create({})

/* <WarningCard>
title="High Temperature"
message="Please stay hydrated and take breaks regularly."
icon="weather-sunny-alert"
color="red" 
<WarningCard/> */
