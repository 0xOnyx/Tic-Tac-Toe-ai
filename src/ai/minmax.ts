import type {t_pos, t_size} from "../type/type.ts";
import {e_minmax, e_player} from "../type/type.ts";
import {calc_board_value} from "./calc_board_value.ts";
import {has_won} from "./has_won.ts";
import {Ref, max, min} from "./utils.ts";


export function minmax(size: t_size, tab: e_player[][],
	depth: number,	current_pos: number[], current_minmax: e_minmax, alpha: number, beta: number, nbr: Ref<number>): number
{
	let		pos: t_pos = {x: 0, y: 0};
	let 	current_value: number;

	nbr.value++;
	if (depth == 0)
		return (calc_board_value(size, tab));
	current_value = 0;
	pos.x = 0;
	if (current_minmax == e_minmax.MAXIMIZER)
	{
		current_value = Number.MIN_VALUE;
		while (pos.x < size.col)
		{
			if ((pos.y = current_pos[pos.x]) >= size.row)
			{
				pos.x++;
				continue;
			}
			current_pos[pos.x]++;
			tab[pos.y][pos.x] = e_player.AI;
			if (has_won(size, tab, pos))
			{
				tab[pos.y][pos.x] = e_player.NONE;
				current_pos[pos.x]--;
				return (100 + depth);
			}
			current_value = max(current_value, minmax(size, tab, depth - 1, current_pos, e_minmax.MINIMIZER, alpha, beta, nbr));
			if (current_value > beta)
			{
				tab[pos.y][pos.x] = e_player.NONE;
				current_pos[pos.x]--;
				break ;
			}
			alpha = max(alpha, current_value);
			tab[pos.y][pos.x] = e_player.NONE;
			current_pos[pos.x]--;
			pos.x++;
		}
	}
	else if (current_minmax == e_minmax.MINIMIZER)
	{
		current_value = Number.MAX_VALUE;
		while (pos.x < size.col)
		{
			if ((pos.y = current_pos[pos.x]) >= size.row)
			{
				pos.x++;
				continue;
			}
			current_pos[pos.x]++;
			tab[pos.y][pos.x] = e_player.HUMAN;
			if (has_won(size, tab, pos))
			{
				tab[pos.y][pos.x] = e_player.NONE;
				current_pos[pos.x]--;
				return (-100 - depth);
			}
			current_value = min(current_value, minmax(size, tab, depth - 1, current_pos, e_minmax.MAXIMIZER, alpha, beta, nbr));
			if (current_value < alpha)
			{
				tab[pos.y][pos.x] = e_player.NONE;
				current_pos[pos.x]--;
				break ;
			}
			beta = min(beta, current_value);
			tab[pos.y][pos.x] = e_player.NONE;
			current_pos[pos.x]--;
			pos.x++;
		}
	}
	return (current_value);
}
