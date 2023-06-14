import { e_player, e_minmax } from "../type/type.ts";
import type { t_size } from "../type/type.ts";

function minmax(size: t_size, tab: e_player[][],
	depth: number,	current_pos: number[], current_minmax: e_minmax, alpha: number, beta: number, unsigned long int *nbr): number
{
	t_pos	pos;
	int 	current_value;

	(*nbr)++;
	if (depth == 0)
		return (calc_board_value(size, tab));
	current_value = 0;
	pos.x = 0;
	if (current_minmax == MAXIMIZER)
	{
		current_value = INT_MIN;
		while (pos.x < size.col)
		{
			if ((pos.y = current_pos[pos.x]) >= size.row)
			{
				pos.x++;
				continue;
			}
			current_pos[pos.x]++;
			tab[pos.y][pos.x] = AI;
			if (has_won(size, tab, pos))
			{
				tab[pos.y][pos.x] = NONE;
				current_pos[pos.x]--;
				return (100 + depth);
			}
			current_value = max(current_value, minmax(size, tab, depth - 1, current_pos, MINIMIZER, alpha, beta, nbr));
			if (current_value > beta)
			{
				tab[pos.y][pos.x] = NONE;
				current_pos[pos.x]--;
				break ;
			}
			alpha = max(alpha, current_value);
			tab[pos.y][pos.x] = NONE;
			current_pos[pos.x]--;
			pos.x++;
		}
	}
	else if (current_minmax == MINIMIZER)
	{
		current_value = INT_MAX;
		while (pos.x < size.col)
		{
			if ((pos.y = current_pos[pos.x]) >= size.row)
			{
				pos.x++;
				continue;
			}
			current_pos[pos.x]++;
			tab[pos.y][pos.x] = HUMAN;
			if (has_won(size, tab, pos))
			{
				tab[pos.y][pos.x] = NONE;
				current_pos[pos.x]--;
				return (-100 - depth);
			}
			current_value = min(current_value, minmax(size, tab, depth - 1, current_pos, MAXIMIZER, alpha, beta, nbr));
			if (current_value < alpha)
			{
				tab[pos.y][pos.x] = NONE;
				current_pos[pos.x]--;
				break ;
			}
			beta = min(beta, current_value);
			tab[pos.y][pos.x] = NONE;
			current_pos[pos.x]--;
			pos.x++;
		}
	}
	return (current_value);
}
