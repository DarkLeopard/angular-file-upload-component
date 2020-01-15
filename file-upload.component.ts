import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: [ './file-upload.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {

  @Input() formControl: FormControl;
  @Input() process: FormControl;
  @Input() accept: string = 'image/jpeg,image/png,image/gif/,image/svg+xml';

  private onChange: any;

  constructor(
      private elementRef: ElementRef<HTMLInputElement>,
  ) {}

  @HostListener('change', [ '$event.target.files' ]) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
  }

  public ngOnInit(): void {}

  writeValue(value: null) {
    this.elementRef.nativeElement.value = '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
  }
}
