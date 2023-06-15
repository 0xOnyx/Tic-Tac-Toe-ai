import type {t_pos, t_size} from "../type/type";


const DEPTH: number =  10

function play_ai(size: t_size, tab: e_player[][], current_pos: number[]): t_pos
{
    let 	col_max: number;
    let 	value_max: number;
    let     pos: t_pos;
    let     nbr: number;

    nbr = 0;
    pos.x = 0;
    value_max = number.MIN_VALUE;
    col_max = pos.x;
    if (gui)
    {
        wclear(progress_bar);
        wrefresh(progress_bar);
        mvwprintw(progress_bar, 0, 0, "[");
        move(0, 0);
    }
    while (pos.x < size.col)
    {
        int tmp_value;
        if ((pos.y = current_pos[pos.x]) >= size.row)
        {
            pos.x++;
            continue;
        }
        current_pos[pos.x]++;
        tab[pos.y][pos.x] = AI;
        if ((tmp_value = max(value_max, minmax(size, tab, DEPTH, current_pos, MINIMIZER, INT_MIN, INT_MAX, &nbr))) != value_max)
        {
            value_max = tmp_value;
            col_max = pos.x;
        }
        if (!gui)
            printf(" pos => %d minmax => %d\n", pos.x, tmp_value);
        else
        {
            mvwprintw(progress_bar, 0, pos.x * 4, "====>");
            move(0, (pos.x * 4) - 1);
            wrefresh(progress_bar);
        }
        tab[pos.y][pos.x] = NONE;
        current_pos[pos.x]--;
        pos.x++;
    }
    if (!gui)
        printf("number iterationr => %lu\n", nbr);
    else
    {
        wclear(progress_bar);
        setlocale(LC_NUMERIC, "");
        mvwprintw(progress_bar, 0, 0, "nbr iteration => %'lu", nbr);
        wrefresh(progress_bar);
        move(0, 0);
    }
    pos.x = col_max;
    pos.y = current_pos[col_max];
    current_pos[col_max]++;
    return (pos);
}