export class User {
    user_id: string;
	username: string;
	password: string;
	local_file_ids: string[];
	group_ids: string[];

    constructor(user_id: string, username: string, user_password: string, local_file_ids: string[] = [], group_ids: string[] = []) {
        this.user_id = user_id;
        this.username = username;
        this.password = user_password;
        this.local_file_ids = local_file_ids;
        this.group_ids = group_ids;
    }
}