import {Config} from "./config";
import {Option} from "./option";
import {User} from "./user";

export class Poll {
  id: number;
  owner: User;
  question: string;
  options: Option[];
  config: Config;


}
