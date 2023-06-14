
import { e_player } from "../type/type.ts";
import type { t_size } from "../type/type.ts";

const WINDOWS:number =  4

function calc_value_tab(tab: e_player[]): number
{
	let i: number;
	let number_of_op: number = 0;
	let number_of_player: number = 0;
	let number_of_none: number = 0;

	i = 0;
	while (i < WINDOWS)
	{
		if (tab[i] == e_player.HUMAN)
			number_of_op++;
		else if (tab[i] == e_player.AI)
			number_of_player++;
		else if (tab[i] == e_player.NONE)
			number_of_none++;
		i++;
	}
	if (number_of_player == 4)
		return (100);
	else if (number_of_player == 3 && number_of_none == 1 && number_of_op == 0)
		return (5);
	else if (number_of_player == 2 && number_of_none == 2 && number_of_op == 0)
		return (2);
	else if (number_of_op == 3 && number_of_none == 1 && number_of_player == 0)
		return (-4);
	return (0);
}

function calc_board_value(size: t_size, tab: e_player[][]): number
{
	let	score: number;
	let x: number;
	let y: number;
	let i: number;

	score = 0;
	x = 0;
	// vertical
	while (x < size.col)
	{
		y = 0;
		while (y < size.row - 3)
		{
			score += calc_value_tab([tab[y][x], tab[y + 1][x], tab[y + 2][x], tab[y + 3][x]]);
			y++;
		}
		x++;
	}
	// horizontal
	y = 0;
	while (y < size.row)
	{
		x = 0;
		while (x < size.col - 3)
		{
			score += calc_value_tab([tab[y][x], tab[y][x + 1], tab[y][x + 2], tab[y][x + 3]]);
			x++;
		}
		y++;
	}

	// diagonal sw_ne
	x = -size.row;
	while (x < size.col)
	{
		i = 0;
		while (i < size.row)
		{
			if (!( x + i < 0 || x + i + 3 >= size.col || y + i < 0 || y + i + 3 >= size.row ))
				score += calc_value_tab([tab[i][x], tab[i + 1][x + 1 + i], tab[i + 2][x + 2 + i], tab[i + 3][x + 3 + i]]);
			i++;
		}
		x++;
	}

	// diagonal nw_se
	x = 0;
	while (x < size.col + size.row)
	{
		i = 0;
		while (i < size.row - 3 )
		{
			if (!( x - i - 3 < 0 || x - i  >= size.col))
				score += calc_value_tab([tab[i][x - i], tab[i + 1][x - i - 1], tab[i + 2][x - i -  2], tab[i + 3][x - i - 3]]);
			i++;
		}
		x++;
	}

	return (score);
}