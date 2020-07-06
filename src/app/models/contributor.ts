import { User } from './user';
import { ContributorType} from './contributors/contributor-type';

export class Contributor {
    user?: User;
    contributorType: ContributorType;
}
