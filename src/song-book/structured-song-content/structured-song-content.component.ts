import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { StructuredSongDTO } from 'src/songs-api-client';
import { SongRepositoryService } from '../song-repository.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'sb-structured-song-content',
  templateUrl: './structured-song-content.component.html',
  styleUrls: ['./structured-song-content.component.scss']
})
export class StructuredSongContentComponent implements OnInit, OnDestroy {

  protected song?: StructuredSongDTO
  private songSub?: Subscription

  public songForm = this.fb.group({
    number: [''],
    title: [''],
    originalTitle: [''],
    author: ['']
  });

  previousListState: string[][] = [];

  listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  private songObserver = {
    next: (x: StructuredSongDTO) => {
      this.song = x
      this.songInit()
    },
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  constructor(
    private repository: SongRepositoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.songSub?.unsubscribe()
  }
  ngOnInit(): void {
    this.songSub = this.repository.getSelectedStructuredSong().subscribe(this.songObserver)
  }

  private songInit() {
    this.songForm.patchValue({
      number: this.song?.number,
      title: this.song?.title,
      originalTitle: this.song?.originalTitle,
      author: this.song?.author
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listItems, event.previousIndex, event.currentIndex);
  }

  dragStarted(event: CdkDragStart) {
    event.source.element.nativeElement.classList.add('dragging');
    const sibling = event.source.element.nativeElement.nextElementSibling;
    if (sibling) {
      sibling.classList.add('dragging');
    }
  }

  dragEnded(event: CdkDragEnd) {
    event.source.element.nativeElement.classList.remove('dragging');
    const sibling = event.source.element.nativeElement.nextElementSibling;
    if (sibling) {
      sibling.classList.remove('dragging');
    }
  }

  copyItem(item: string) {
    const index = this.listItems.indexOf(item);
    this.previousListState.push(this.listItems.slice());
    this.listItems.splice(index + 1, 0, item);
  }

  deleteItem(item: string) {
    const index = this.listItems.indexOf(item);
    this.previousListState.push(this.listItems.slice());
    this.listItems.splice(index, 1);
  }

  undo() {

    let lastElem = this.previousListState.pop();
    if (lastElem !== undefined) {
      this.listItems = lastElem
    }

  }

  onSubmit() {
    console.log(this.listItems)
  }
}
