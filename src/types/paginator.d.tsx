import {UserInterface} from "./models.d";

export interface PaginatorInterface {
  items: UserInterface[];
  total_count: number;
}
