export class Group {
    private group_id: string;
	private group_name: string;
	private members: string[]; //members
	private server_file_ids: string[];

    constructor(group_id: string, group_name: string, members: string[] = [], server_file_ids: string[] = []) {
        this.group_id = group_id;
        this.group_name = group_name;
        this.members = members;
        this.server_file_ids = server_file_ids;
    }
}