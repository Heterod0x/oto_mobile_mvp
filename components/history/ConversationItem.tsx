import { ConversationDTO } from "@/types/conversation";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  conversation: ConversationDTO;
}

export default function ConversationItem({ conversation }: Props) {
  const date = new Date(conversation.created_at);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{conversation.file_name}</Text>
        <Text style={styles.date}>{date.toLocaleString()}</Text>
      </View>
      <Text style={styles.status}>{conversation.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  status: {
    marginLeft: 8,
    fontSize: 12,
    color: "#666",
  },
});
