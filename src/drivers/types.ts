import { mlstring } from "uask-dom";

export type Value = Date | number | mlstring | undefined;

export type Json<T = unknown> = Record<string, T>;
