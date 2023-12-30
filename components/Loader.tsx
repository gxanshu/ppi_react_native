import {ActivityIndicator, View } from "react-native";

export default function Loader(){
	return (
		<View style={{flex: 1, justifyContent: 'center'}}>
			<ActivityIndicator size={'large'} color="#3366FF" />
		</View>
	)
}