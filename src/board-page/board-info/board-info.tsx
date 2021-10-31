import React, { useState, useRef, useEffect } from "react";
import { View, Image, Button } from "react-native";
import { Board } from "../../board-logic/board/board";
import { CapturedPieces } from "./captured-pieces";
import { GameStatus } from "./game-status";
import { styles } from "./style";
import { colours } from "../../global.style";

interface BoardInfoProps {
  board: Board;
  restart: () => void;
}

/**
 *
 */
export default function BoardInfo(props: BoardInfoProps) {
  const { board, restart } = props;
  const tutorialBtn = useRef<HTMLButtonElement>(null);

  /**
   * Checks to see if user has opened the tutorial modal before.
   * If the havn't, we highlight the tutorial button with animation.
   */
  useEffect(() => {
    const btn = tutorialBtn.current;
    let count = 0;
    let intervalId = 0;

    intervalId = window.setInterval(() => {
      if (!btn) return;
      btn.classList.remove("attention");
      // JS trick to force browser to animate
      void btn.offsetWidth;
      btn.classList.add("attention");
      count++;
      // Animate  btn 3 times then remove inetarvel
      if (count === 3) clearInterval(intervalId);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <CapturedPieces board={board} colour={"BLACK"} pieceWidth={40} />
      <View style={{ flex: 0.3 }}>
        <GameStatus
          status={board.state.status}
          turn={board.state.turn}
          totalTurns={board.totalTurns}
          player={board.state.player}
        />
        <Button onPress={restart} title="Restart Game" color={colours.gray}></Button>
      </View>
      <CapturedPieces board={board} colour={"WHITE"} pieceWidth={40} />
    </View>
  );
}
