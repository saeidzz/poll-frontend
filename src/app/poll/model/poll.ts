import {Config} from './config';
import {User} from './user';

export class Poll {
  id: number;
  owner: User;
  question: string;
  options: string[];
  config: Config;
}
