import React, { useState, useEffect } from 'react';

type SquareValue = 'X' | 'O' | null;

interface SquareProps {
	value: SquareValue;
	onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
	return (
		<button className="square" onClick={onClick}>
			{value}
		</button>
	);
};

const Board: React.FC = () => {
	const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState<boolean>(true);

	useEffect(() => {
		if (!xIsNext) {
			// Computer's turn
			const bestMove = getBestMove(squares);
			if (bestMove !== null) {
				const newSquares = [...squares];
				newSquares[bestMove] = 'O';
				setSquares(newSquares);
				setXIsNext(true);
			}
		}
	}, [squares, xIsNext]);

	const handleClick = (index: number) => {
		if (calculateWinner(squares) || squares[index]) {
			return;
		}

		const newSquares = [...squares];
		newSquares[index] = 'X';
		setSquares(newSquares);
		setXIsNext(false);
	};

	const renderSquare = (index: number) => {
		return (
			<Square value={squares[index]} onClick={() => handleClick(index)} />
		);
	};

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		if (winner === 'X') {
			status = 'Player X wins!';
		} else if (winner === 'O') {
			status = 'Player O wins!';
		}
	} else if (squares.every((square) => square !== null)) {
		status = "It's a draw!";
	} else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`;
	}

	return (
		<div>
			<div className="status">{status}</div>
			<div className="board-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="board-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="board-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	);
};

const calculateWinner = (squares: SquareValue[]): SquareValue | null => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}

	return null;
};

const getBestMove = (squares: SquareValue[]): number | null => {
	const availableMoves: number[] = [];

	for (let i = 0; i < squares.length; i++) {
		if (squares[i] === null) {
			availableMoves.push(i);
		}
	}

	let bestScore = -Infinity;
	let bestMove = null;
	let alpha = -Infinity;
	let beta = Infinity;

	for (let i = 0; i < availableMoves.length; i++) {
		const move = availableMoves[i];
		const newSquares = [...squares];
		newSquares[i] = 'O';

		const score = minimax(newSquares, false, alpha, beta);

		if (score > bestScore) {
			bestScore = score;
			bestMove = move;
		}

		alpha = Math.max(alpha, bestScore);

		if (beta <= alpha) {
			break; // Élagage alpha-beta
		}
	}

	return bestMove;
};

const minimax = (squares: SquareValue[], isMaximizing: boolean, alpha: number, beta: number): number => {
	const winner = calculateWinner(squares);

	if (winner === 'X') {
		return -1;
	}
	if (winner === 'O') {
		return 1;
	}
	if (squares.every((square) => square !== null)) {
		return 0;
	}

	if (isMaximizing) {
		let bestScore = -Infinity;

		for (let i = 0; i < squares.length; i++) {
			if (squares[i] === null) {
				const newSquares = [...squares];
				newSquares[i] = 'O';

				const score = minimax(newSquares, false, alpha, beta);
				bestScore = Math.max(bestScore, score);
				alpha = Math.max(alpha, bestScore);

				if (beta <= alpha) {
					break; // Élagage alpha-beta
				}
			}
		}

		return bestScore;
	} else {
		let bestScore = Infinity;

		for (let i = 0; i < squares.length; i++) {
			if (squares[i] === null) {
				const newSquares = [...squares];
				newSquares[i] = 'X';

				const score = minimax(newSquares, true, alpha, beta);
				bestScore = Math.min(bestScore, score);
				beta = Math.min(beta, bestScore);

				if (beta <= alpha) {
					break; // Élagage alpha-beta
				}
			}
		}

		return bestScore;
	}
};

const TicTacToe: React.FC = () => {
	return (
		<div className="tic-tac-toe">
			<h1>Tic Tac Toe</h1>
			<Board />
		</div>
	);
};

export default TicTacToe;
