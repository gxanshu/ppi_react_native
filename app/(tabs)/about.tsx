import { useAuth } from "@/context/AuthContext";
import { Layout, Button } from "@ui-kitten/components";
import { Linking, StyleSheet, View } from "react-native";

export default function AboutPage() {
	const { signOut } = useAuth();
	return (
		<Layout style={styles.container}>
			<View style={styles.card} />
			<View style={styles.buttonList}>
				<Button style={styles.button} status="basic">
					Download ID Card
				</Button>
				<Button style={styles.button} status="basic" onPress={()=> {
					Linking.openURL(`whatsapp://send?phone=$916367983544&text=Hello!`);
				}}>
					Contect Us
				</Button>
				<Button style={styles.button} status="basic" onPress={signOut}>
					Logout
				</Button>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		padding: 20,
		gap: 10,
		flex: 1,
		alignItems: "center",
		width: "100%",
	},
	card: {
		height: 200,
		width: "100%",
		borderRadius: 10,
		backgroundColor: "lightgray",
	},
	buttonList: {
		flexDirection: "column",
		width: "100%",
		gap: 5,
		marginTop: 20,
	},
	button: {
		justifyContent: "flex-start"
	},
});
