import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observer, Observable } from 'rxjs';
import { StructuredSlideDTO, StructuredSongDTO } from 'src/songs-api-client';
import { SongRepositoryService } from '../song-repository.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'sb-structured-song-content',
  templateUrl: './structured-song-content.component.html',
  styleUrls: ['./structured-song-content.component.scss']
})
export class StructuredSongContentComponent implements OnInit, OnDestroy {

  private songSub?: Subscription
  private paramMapSub?: Subscription
  private song?: StructuredSongDTO
  private previousSongState: StructuredSongDTO[][] = []
  private songObserver: Observer<StructuredSongDTO> = {
    next: (x) => {
      this.song = x
      this.songFromInit()
    },
    error: () => {
      console.log('Error happened')
    },
    complete: () => {
      console.log('song asndkjasbdkwjbndlas dkjasd')
    },
  }

  public songForm: FormGroup;

  constructor(
    private repository: SongRepositoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.songForm = this.fb.group({
      number: ['', Validators.required],
      title: ['', Validators.required],
      originalTitle: [''],
      author: [''],
      parts: this.fb.array([]),
    })
  }

  ngOnDestroy(): void {
    this.songSub?.unsubscribe()
    this.paramMapSub?.unsubscribe()
  }

  ngOnInit(): void {
    this.paramMapSub = this.route.paramMap.subscribe(x => {
      this.repository.setSelectedSong(x.get('id'))
      this.songSub = this.repository.getSelectedStructuredSong().subscribe(this.songObserver)
    })
  }

  private songFromInit(): void {
    //Clear parts formArray
    this.getPartsFormArray().clear()

    this.songForm.patchValue({
      number: this.song?.number,
      title: this.song?.title,
      originalTitle: this.song?.originalTitle,
      author: this.song?.originalTitle,
    })

    let i: number = 0;
    this.song?.partOrder?.forEach(partId => {
      let part = this.song?.parts?.filter(s => s.id === partId)[0];
      this.addPart(part?.name)
      part?.slideOrder?.forEach(slideId => {
        let slide = this.song?.slides?.filter(slide => slide.id = slideId)[0]
        this.addSlide(i, slide?.text)
      })
      i++
    })
  }

  //Part Section
  public newPart(name: string = ''): FormGroup {
    return this.fb.group({
      name: name,
      slides: this.fb.array([])
    })
  }

  public addPart(name: string = ''): void {
    this.getPartsFormArray().push(this.newPart(name))
  }

  public removePart(index: number): void {
    this.getPartsFormArray().removeAt(index)
  }

  public getPartsFormArray(): FormArray {
    return this.songForm?.get('parts') as FormArray;
  }

  //Slide Section
  public getSlidesFormArray(index: number): FormArray {
    return this.getPartsFormArray().controls[index].get('slides') as FormArray;
  }

  public newSlide(text: string = ''): FormGroup {
    return this.fb.group({
      text: text,
    })
  }

  public addSlide(partIndex: number, text: string = ''): void {
    this.getSlidesFormArray(partIndex).push(this.newSlide(text));
  }

  public removeSlide(partIndex: number, slideIndex: number): void {
    this.getSlidesFormArray(partIndex).removeAt(slideIndex);
  }




  public drop(event: CdkDragDrop<StructuredSlideDTO[]>): void {
    //moveItemInArray(this.slideList, event.previousIndex, event.currentIndex)
  }

  public dragStarted(event: CdkDragStart): void {
    event.source.element.nativeElement.classList.add('dragging')
    const sibling = event.source.element.nativeElement.nextElementSibling
    if (sibling) {
      sibling.classList.add('dragging')
    }
  }

  public dragEnded(event: CdkDragEnd): void {
    event.source.element.nativeElement.classList.remove('dragging')
    const sibling = event.source.element.nativeElement.nextElementSibling
    if (sibling) {
      sibling.classList.remove('dragging')
    }
  }

  public copyPart(item: any): void {
    // const index = this.slideList.indexOf(item)
    // this.previousSongState.push(this.slideList.slice())
    // this.slideList.splice(index + 1, 0, item)
  }

  public undo(): void {

    let lastElem = this.previousSongState.pop()
    if (lastElem !== undefined) {
      //reinitialize song form
    }

  }

  onSubmit(): void {
    console.log(this.songForm.value)
  }
}
