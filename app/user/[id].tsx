import { Layout, Text } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import { UserType } from "../auth/RegisterPage";
import { ScrollView, StyleSheet, View } from "react-native";
import { formatDateString } from "@/utils/tools";

interface SearchParams extends UserType {
	id: string
}

export default function UserPage() {
	// @ts-ignore everything is allright
	const details = useLocalSearchParams<SearchParams>()

	if (!details) {
		return <Text>No User Found</Text>
	}

	return (
		<Layout style={styles.container}>
			<View style={styles.card} />
			<ScrollView>
				<Layout style={styles.details}>
				<View style={styles.row}>
					<Text>Category:</Text>
					<Text style={{ fontWeight: 'bold' }}>{details.Type.split("-")[0]}</Text>
				</View>
				<View style={styles.row}>
					<Text>Name:</Text>
					<Text style={{ fontWeight: 'bold' }}>{details.Name}</Text>
				</View>
				<View style={styles.row}>
					<Text>Father's Name:</Text>
					<Text style={{ fontWeight: 'bold' }}>{details.FatherName}</Text>
				</View>
				<View style={styles.row}>
					<Text>Phone Number:</Text>
					<Text style={{ fontWeight: 'bold' }}>{details.PhoneNumber}</Text>
				</View>
				<View style={styles.row}>
					<Text>District:</Text>
					<Text style={{ fontWeight: 'bold' }}>{details.District}</Text>
				</View>
				<View style={styles.row}>
					<Text>Address:</Text>
					<Text style={{ fontWeight: 'bold' }}>{details.Address}</Text>
				</View>
				<View style={styles.row}>
					<Text>Joined At:</Text>
					<Text style={{ fontWeight: 'bold' }}>{formatDateString(details.CreatedAt)}</Text>
				</View>
			</Layout>
			</ScrollView>
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		padding: 20
	},
	card: {
		height: 200,
		width: "100%",
		borderRadius: 10,
		backgroundColor: "lightgray"
	},
	details: {
		marginTop: 20,
		flexDirection: 'column',
		gap: 8
	},
	row: {
		flexDirection: "row",
		gap: 8
	}
})