import { Icon, Input, Layout } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, StatusBar } from "react-native";

export default function SearchPage() {
	const [value, setValue] = useState("");

	return (
		<Layout style={styles.container} level="2">
			<Input
				placeholder="Search by number"
				value={value}
				keyboardType="number-pad"
				onChangeText={(nextValue) => setValue(nextValue)}
				accessoryRight={<Icon name="search" />}
			/>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: StatusBar.currentHeight! + 20,
		paddingHorizontal: 10,
		height: '100%'
	}
})