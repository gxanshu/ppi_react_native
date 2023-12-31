import { Layout, Text, Button } from "@ui-kitten/components";
import { Image, Linking, StyleSheet } from "react-native";

export default function ReportPage() {
	return (
		<Layout style={styles.container}>
			<Image
				source={require("@/assets/images/reports.gif")}
				style={{ height: 100, width: 100 }}
			/>
			<Text category="h5">Submit Your Complain!</Text>
			<Button
				style={styles.button}
				status="info"
				onPress={()=> {
					Linking.openURL(`whatsapp://send?phone=$916367983544&text=Hello!`);
				}}
			>
				Contact Us
			</Button>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		paddingHorizontal: 20,
		gap: 20,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: "100%",
	},
});
