import { Line } from "./line_model";

export class File {
    private local_file_id: number | null;
    private server_file_id: string | null;
	private file_name: string;
	private lines: Line[];

    constructor(local_file_id: number | null, server_file_id: string | null, file_name: string, lines: Line[] = []) {
        this.local_file_id = local_file_id;
        this.server_file_id = server_file_id;
        this.file_name = file_name;
        this.lines = lines;
    }
}