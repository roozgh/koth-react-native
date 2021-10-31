import React, { useRef } from "react";
import { Image, Pressable } from "react-native";
import { Colour, PieceName } from "../../board-logic/piece";

import whiteKing from "./images/white/king.png";
import whiteMagician from "./images/white/magician.png";
import whiteSpy from "./images/white/spy.png";
import whiteTower from "./images/white/tower.png";
import whiteArcher from "./images/white/archer.png";
import whiteChariot from "./images/white/chariot.png";

import blackKing from "./images/black/king.png";
import blackMagician from "./images/black/magician.png";
import blackSpy from "./images/black/spy.png";
import blackTower from "./images/black/tower.png";
import blackArcher from "./images/black/archer.png";
import blackChariot from "./images/black/chariot.png";

import goldenKing from "./images/golden-king.png";

type PieceImages = {
  [key in Colour]: {
    [key in PieceName]: any;
  };
};

const pieceImages: PieceImages = {
  WHITE: {
    KING: whiteKing,
    MAGICIAN: whiteMagician,
    SPY: whiteSpy,
    TOWER: whiteTower,
    ARCHER: whiteArcher,
    CHARIOT: whiteChariot,
  },
  BLACK: {
    KING: blackKing,
    MAGICIAN: blackMagician,
    SPY: blackSpy,
    TOWER: blackTower,
    ARCHER: blackArcher,
    CHARIOT: blackChariot,
  },
};

export interface PieceProps {
  name: PieceName;
  colour: Colour;
  width: number;
  movable?: boolean;
  position?: { x: number; y: number };
  isGolden?: boolean;
  onPieceDrag?: (e: MouseEvent) => void;
  onPieceClick?: () => void;
}

export function Piece(opts: PieceProps) {
  const { name, colour, movable, width, isGolden, onPieceClick } = opts;
  const mouseDown = useRef(false);
  let pieceImage = pieceImages[colour][name];

  if (isGolden && name === "KING") {
    pieceImage = goldenKing;
  }

  return <Image source={pieceImage} style={{ width, height: width }} />;
}
