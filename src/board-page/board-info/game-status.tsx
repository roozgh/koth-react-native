import React, { useRef, memo, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { colours } from "../../global.style";

interface GameStatusProps {
  status: string;
  turn: number;
  totalTurns: number;
  player: "BLACK" | "WHITE";
}

/**
 * Display game status
 */
export const GameStatus = memo((props: GameStatusProps) => {
  const { status, turn, totalTurns, player } = props;
  //const statusElm = useRef<HTMLDivElement | null>(null);

  let txt = "";
  switch (status) {
    case "ACTIVE":
      txt = `TURN: ${turn} / ${totalTurns}`;
      break;
    case "DRAW":
      txt = "Game Drawn";
      break;
    case "WHITE":
      txt = "Blue Won!";
      break;
    case "BLACK":
      txt = "Red Won!";
      break;
    default:
      throw Error(`Invalid board Status: ${status}`);
  }

  const backgroundColor = player === "WHITE" ? colours.white : colours.black;

  return (
    <View style={[styles.status, { backgroundColor }]}>
      <Text style={{ color: "#fff", fontWeight: "bold" }}>{txt}</Text>
    </View>
  );
});
