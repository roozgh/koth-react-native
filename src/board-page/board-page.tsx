import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { styles } from "./board-page.style";
import BoardView from "../components/board-view/board-view";
import { Board } from "../board-logic/board/board";
import { Colour } from "../board-logic/piece";
import { delay } from "../utils/utils";
import { defaultBoardState, scoreEvalPlugins } from "./board-default-state";
import { getMoveCandidates } from "../board-logic/ai/move-finder";
import BoardInfo from "./board-info/board-info";
import { colours } from "../global.style";

//const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const maxBoardWidth = 500;

const board = new Board({ x: 7, y: 7, hills: ["D4"] });
board.state.setStateFromJSON(defaultBoardState);

export default function Page() {
  //console.log("BOARD PAGE RENDER");
  const [boardWidth, setBoardWidth] = useState(Math.min(screen.width, maxBoardWidth));
  const [token, setToken] = useState(Math.random());
  const [playable, setPlayable] = useState(true);
  const [selectTile, setSelectTile] = useState<null | string>(null);
  const moveToPlayTimeoutId = useRef(0);

  /**
   * For handling Screen size change
   */
  useEffect(() => {
    const handler = ({ screen }) => {
      setBoardWidth(Math.min(screen.width, maxBoardWidth));
    };
    Dimensions.addEventListener("change", handler);
    return () => Dimensions.removeEventListener("change", handler);
  }, []);

  const simulateComputerPlay = useCallback(async () => {
    // Disable board interaction if it's computer's turn
    setPlayable(false);
    const seed = board.state.seed;

    await delay(500);

    const moveCandidate = getMoveCandidates(board, scoreEvalPlugins);
    if (moveCandidate === null) {
      return console.error("No move candidates found");
    }
    const [moveFrom, moveTo] = moveCandidate;

    setSelectTile(moveFrom);
    await delay(1500);

    // Make sure there's no turn mis-match
    // e.g User pressing the 'Restart' button
    // while move animation is hapening
    if (board.state.seed !== seed) return;

    board.move(moveFrom, moveTo);
    setToken(Math.random());
    setSelectTile(null);
    setPlayable(true);
  }, []);

  /**
   * Called when player makes a new move
   */
  const onPieceMove = useCallback(
    (from: string, to: string) => {
      if (!board.isValidMove(from, to)) return;
      board.move(from, to);
      setToken(Math.random());

      // Can't move or click pieces if game over
      if (board.state.status !== "ACTIVE") {
        return setPlayable(false);
      }

      if (board.state.player === "WHITE") return;
      // If game not over and it's Black's turn
      // and game mode is Against CPU, play CPU's turn
      simulateComputerPlay();
    },
    [simulateComputerPlay]
  );

  function onRestart() {
    if (board.state.turn === 1) return;
    board.state.reset();
    setToken(Math.random());
    setSelectTile(null);
    setPlayable(true);
    // Clear move simulation timeout if it exists
    if (moveToPlayTimeoutId.current) {
      clearTimeout(moveToPlayTimeoutId.current);
    }
  }

  return (
    <View style={styles.page}>
      <View style={[styles.container, { width: boardWidth }]}>
        <BoardBorder turn={board.state.player} player="BLACK" />
        <BoardView
          board={board}
          token={token}
          boardMaxWidth={boardWidth}
          playable={playable}
          selectTile={selectTile}
          onPieceMove={onPieceMove}
        />
        <BoardBorder turn={board.state.player} player="WHITE" />
        <BoardInfo board={board} restart={onRestart} />
      </View>
    </View>
  );
}

function BoardBorder({ turn, player }: { turn: Colour; player: Colour }) {
  const colour = player === "BLACK" ? colours.black : colours.white;
  return (
    <View
      style={{
        width: "100%",
        height: 10,
        backgroundColor: turn === player ? colour : colours.gray,
      }}
    />
  );
}
