import { AppRole } from "./app-role";
import { UserInfo } from "./user-info";
import { VerificationToken } from "./verification-token";

export class AppUser {
    id: number;
    username: string;
    password: string;
    email: string;
    enabled: boolean;
    accountNonLocked: boolean;
    userInfo: UserInfo;
    appRole: AppRole[];
    dateNew: Date;
    userNew: string;
    dateEdit: Date;
    userEdit: string;

    constructor() {
        this.username = '';
        this.password = '';
        this.email = '';
        this.enabled = false;
        this.accountNonLocked = false;
        this.userNew = '';
        this.userEdit = '';
    }
}