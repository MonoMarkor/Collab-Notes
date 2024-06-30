export class Line {
    private line_id: number;
	private position: number;
    private content: string;
    private styles: string[];

    constructor(line_id: number, position: number, content: string, styles: string[] = []) {
        this.line_id = line_id;
        this.position = position;
        this.content = content;
        this.styles = styles;
    }
}