import { realtimeDB } from "@/utils/firebase";
import { formatNumber } from "@/utils/tools";
import { Icon, Layout } from "@ui-kitten/components";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	ImageBackground,
} from "react-native";

const counterStyle = { fontSize: 42 };
const titleStyle = { fontSize: 16 };

export default function StatisticsPage() {
	const [value, setValue] = useState({});

	const distictList = Object.entries(value).map(([title, value]) => ({
		title,
		value,
	}));

	const totalUsers = distictList.reduce((sum, item) => sum + Number(item.value), 0);

	useEffect(() => {
		const statisticsRef = ref(realtimeDB, "rajasthan");
		onValue(statisticsRef, (snapShot) => {
			const data = snapShot.val();
			setValue(data);
		});
	}, []);

	return (
		<Layout level="2" style={{height: "100%"}}>
			<ScrollView>
			<Layout style={styles.container}>
				<ImageBackground
					borderRadius={10}
					source={require("@/assets/images/rajasthan.jpg")}
					style={styles.mainCard}
				>
					<View style={styles.mainCardContainer}>
						<Icon
							name="people-outline"
							style={{ height: 52, width: 52 }}
							fill="#fff"
						/>
						<Text
							style={{
								fontSize: 42,
								color: "#fff",
								fontWeight: "bold"
							}}
						>
							{totalUsers}
						</Text>
					</View>
					<Text
						style={{
							fontSize: 42,
							color: "#D3D3D3",
							margin: 20,
						}}
					>
						Rajashtan
					</Text>
				</ImageBackground>
				{distictList.map(
					(_, index) =>
						index % 2 === 0 && ( // Check if it's an even index
							<Layout key={index / 2} style={styles.row}>
								<View style={styles.card}>
									<Text style={counterStyle}>
										{formatNumber(Number(distictList[index].value))}
									</Text>
									<Text style={titleStyle}>{distictList[index].title}</Text>
								</View>
								{index + 1 < distictList.length && ( // Check if there is another item
									<View style={styles.card}>
										<Text style={counterStyle}>
											{formatNumber(Number(distictList[index + 1].value))}
										</Text>
										<Text style={titleStyle}>
											{distictList[index + 1].title}
										</Text>
									</View>
								)}
							</Layout>
						),
				)}
			</Layout>
		</ScrollView>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		margin: 18,
		backgroundColor: "transparent",
	},
	mainCard: {
		height: 200,
		width: "100%",
		borderRadius: 12,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	mainCardContainer: {
		margin: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	row: {
		flexDirection: "row",
		gap: 10,
		width: "100%",
		justifyContent: "space-between",
		backgroundColor: "transparent",
	},
	card: {
		height: 120,
		width: "48.5%",
		borderRadius: 6,
		backgroundColor: "#e6e6e6",
		flexDirection: "column",
		alignItems: "center",
		gap: 12,
		padding: 10,
	},
});
