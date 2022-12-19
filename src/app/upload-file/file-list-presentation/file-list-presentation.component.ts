import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileListPresenterService } from '../file-list-presenter/file-list-presenter.service';
import { Files } from '../model/file.model';

@Component({
  selector: 'app-file-list-presentation',
  templateUrl: './file-list-presentation.component.html',
  viewProviders: [FileListPresenterService]
})
export class FileListPresentationComponent implements OnInit {

  @Input() public set fileList(value: Files[] | null) {
    if (value) {
      this._fileList = value;
    }
  }
  public get fileList(): Files[] {
    return this._fileList;
  }

  private _fileList: Files[] = [];

  @Output() public delete: EventEmitter<number>;

  constructor(private fileListPresenter: FileListPresenterService) { 
    this.delete = new EventEmitter();
  }

  ngOnInit(): void {
    this.fileListPresenter.delete$.subscribe((data: number) => {
      this.delete.emit(data);
    })
  }

  onDelete(id: number) {
    this.fileListPresenter.onDelete(id);
  }
  onView(content: string, type: string){
    this.fileListPresenter.showFile(content, type);
  }
}
