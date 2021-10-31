import React, { useEffect, useReducer, useMemo } from "react";
import { View } from "react-native";
import { Board } from "../../board-logic/board/board";
import { boardViewInitialState } from "./state/board-view-state";
import { boardViewReducer } from "./state/board-view-reducer";
import { BoardViewContext } from "./state/board-view-context";
import { BoardTiles } from "./board-tiles";

interface BoardViewProps {
  board: Board;
  token: number | null;
  playable: boolean;
  boardMaxWidth: number;
  selectTile: null | string;
  onPieceMove?: (from: string, to: string) => void;
}

type draggedPieceCoords = null | { x: number; y: number };

export default function BoardView(opt: BoardViewProps) {
  //console.log("BOARD VIEW RENDER");
  const { board, token, playable, boardMaxWidth, selectTile, onPieceMove } = opt;
  const [state, dispatch] = useReducer(boardViewReducer, boardViewInitialState);
  const { selectedTile } = state;

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  /**
   * Initialise Board
   */
  useEffect(() => {
    dispatch({ type: "INIT", board });
  }, []);

  /**
   * On new turn.
   * Or on board reset.
   */
  useEffect(() => {
    dispatch({ type: "NEW_TURN" });
  }, [token]);

  /**
   * simulate CPU move
   */
  useEffect(() => {
    if (selectTile) {
      dispatch({ type: "TILE_SELECT", tile: selectTile });
    }
  }, [selectTile, onPieceMove]);

  /**
   * Set Board and Tile width
   */
  useEffect(() => {
    const boardColumnCount = board.xAxis.length;
    let boardWidth = boardMaxWidth;
    let tileWidth = Math.floor(boardWidth / boardColumnCount);
    boardWidth = tileWidth * boardColumnCount;
    dispatch({ type: "BOARD_WIDTH_CHANGE", boardWidth, tileWidth });
  }, [boardMaxWidth, board.xAxis.length]);

  return (
    <BoardViewContext.Provider value={contextValue}>
      <View style={{ width: state.boardWidth, height: state.boardWidth }}>
        <BoardTiles tiles={state.tiles} playable={playable} onPieceMove={onPieceMove} />
      </View>
    </BoardViewContext.Provider>
  );
}
