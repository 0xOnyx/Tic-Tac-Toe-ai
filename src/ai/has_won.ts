import {e_player} from "../type/type.ts";
import type {t_pos, t_size} from "../type/type";

export function update_counter(counter: number, token: e_player, size: t_size, tab: e_player[][], y: number, x: number): number
{
    if (y < 0 || y >= size.row || x < 0 || x >= size.col)
        return (counter);
    if (tab[y][x] == token)
        return (counter + 1);
    else
        return (0);
}

export function has_won(size: t_size , tab: e_player[][], pos: t_pos): e_player
{
    let i: number;
    let count_hor: number = 0;
    let count_ver: number = 0;
    let count_diag_up: number = 0;
    let count_diag_down: number = 0;
    let token: e_player = tab[pos.y][pos.x];

    i = -3;
    while (i <= 3)
    {
        count_hor = update_counter(count_hor, token, size, tab, pos.y, pos.x + i);
        count_ver = update_counter(count_ver, token, size, tab, pos.y + i, pos.x);
        count_diag_up = update_counter(count_diag_up, token, size, tab, pos.y + i, pos.x + i);
        count_diag_down = update_counter(count_diag_down, token, size, tab, pos.y - i, pos.x + i);
        if (count_hor >= 4 || count_ver >= 4 || count_diag_up >= 4 || count_diag_down >= 4)
            return (token);
        i++;
    }
    return (e_player.NONE);
}