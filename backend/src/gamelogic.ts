export type SquareValue = 'X' | 'O' | null;

export interface WinnerResult {
  winner: 'X' | 'O';
  line: number[];
}

export function calculateWinner(squares: SquareValue[]): WinnerResult | null {
  const lines: number[][] = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,b,c] of lines) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a,b,c] };
    }
  }
  return null;
}

export function checkDraw(squares: SquareValue[]): boolean {
  if (calculateWinner(squares)) return false;
  return squares.every(s => s !== null);
}
