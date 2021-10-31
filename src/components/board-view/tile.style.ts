import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  boardTiles: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
  tileInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  highlight: {
    borderStyle: "solid",
    borderWidth: 2,
    width: 8,
    height: 8,
    position: "absolute",
    zIndex: 1,
  },
});
