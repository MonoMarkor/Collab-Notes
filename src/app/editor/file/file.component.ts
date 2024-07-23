import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { FormsModule } from '@angular/forms';
import { File } from '../../models/file_model';
import { Node } from '../../models/node_model';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'file',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './file.component.html',
  styleUrl: './file.component.css',
})
export class FileComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  @Input() isIdLocal: boolean = false;

  activity: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    public fileStorage: FileStorageService,
    private websocketService: WebsocketService,
    private usersService: UsersService
  ) {}
  ngOnDestroy(): void {
    this.fileStorage.activeFile = new File('', '', '');
  }

  ngOnInit(): void {
    console.log(this.fileStorage.activeFile);
    this.websocketService.socket$.subscribe((message) => {
      console.log('recieved messeages: ', message);
      let msg = JSON.parse(message);
      if (
        msg.userId == this.usersService.currentUser.userId &&
        msg.fileId == this.fileStorage.activeFile.serverFileId
      ) {
        //change == to !=
        if (msg.action == 'insert') {
          console.log('action: ', msg.action);
          let nodeToInsert: Node = new Node('', [], 0, []);
          nodeToInsert.char = msg.node.char;
          nodeToInsert.siteId = msg.node.siteId;
          nodeToInsert.logicalCount = msg.node.logicalCount;
          nodeToInsert.position = msg.node.position;
          console.log('remote insert', nodeToInsert);
          this.remoteInsert(nodeToInsert);
        } else if (msg.action == 'delete') {
          console.log('action: ', msg.action);
          let nodeToInsert: Node = new Node('', [], 0, []);
          nodeToInsert.char = msg.node.char;
          nodeToInsert.siteId = msg.node.siteId;
          nodeToInsert.logicalCount = msg.node.logicalCount;
          nodeToInsert.position = msg.node.position;
          console.log('remote insert', nodeToInsert);
          this.remoteDelete(nodeToInsert);
        }
      }
    });
  }

  cursorPosition: number = 0;

  onKeyDown(index: any, event: any, userIndex: number) {
    if (event.key == 'Backspace') {
      this.deleteChar(index);
    } else if (event.key == 'Enter') {
      console.log(`Added Line After line ${index}`);
      //this.addLine.emit(index);
      this.insertChar('\n', index, userIndex);
    } else if (event.key.length == 1) {
      this.insertChar(event.key, index, userIndex);
    }
  }

  insertChar(char: string, index: number, userIndex: number) {
    console.log(`Inserted Char '${char}' at Pos: ${index}`);
    this.cursorPosition = index + 1;

    if (index <= this.fileStorage.activeFile.tree.nodes.length) {
      let insertedNode: Node = this.fileStorage.activeFile.tree.localInsert(
        char,
        index,
        userIndex
      );
      this.fileStorage.activeFile.updateContent();
      this.websocketService.send(
        JSON.stringify({
          userId: this.usersService.currentUser.userId,
          fileId: this.fileStorage.activeFile.serverFileId,
          action: 'insert',
          node: insertedNode,
        })
      );
      return;
    }

    console.log(`Failed to insert Char: ${char}`);
  }

  deleteChar(index: number) {
    if (index == 0) {
      return;
    }

    console.log(`Deleted at position: ${index}`);
    this.cursorPosition = index - 1;

    if (index - 1 <= this.fileStorage.activeFile.tree.nodes.length) {
      let deletedNodes: Node[] = this.fileStorage.activeFile.tree.localDelete(
        index - 1
      );
      this.fileStorage.activeFile.updateContent();
      for (let i = 0; i < deletedNodes.length; i++) {
        this.websocketService.send(
          JSON.stringify({
            userId: this.usersService.currentUser.userId,
            fileId: this.fileStorage.activeFile.serverFileId,
            action: 'delete',
            node: deletedNodes[i],
          })
        );
      }
      return;
    }

    console.log(`Failed to local delete`);
  }

  remoteInsert(node: Node) {
    if (this.fileStorage.activeFile.tree.remoteInsert(node)) {
      this.fileStorage.activeFile.updateContent();
    }
  }

  remoteDelete(node: Node) {
    if (this.fileStorage.activeFile.tree.remoteDelete(node)) {
      this.fileStorage.activeFile.updateContent();
    }
  }

  print(obj: any) {
    console.log(obj);
  }

  activityTrue(): void {
    this.activity = true;
  }
}
