export enum e_player {
	NONE = 0,
	HUMAN = 1,
	AI = 2,
}
export enum e_minmax {
	MAXIMIZER = 0,
	MINIMIZER = 1,
}

export type t_tab = e_player[][];

export type t_size = {
	col: number;
	row: number;
}

export type t_pos =
{
	x: number;
	y: number;
}