import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PaintingService} from '../../_services/painting.service';
import {Router} from '@angular/router';
import {Painting} from '../../_models/painting';

@Component({
  selector: 'app-create-painting',
  templateUrl: './create-painting.component.html',
  styleUrls: ['./create-painting.component.css']
})
export class CreatePaintingComponent implements OnInit {
  // Form related
  public addPaintingForm: FormGroup;
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  price = new FormControl('');
  status = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  savedPainting: Painting;
  categoryList;
  statusList;
  submitted = false;
  formValid = false;
  // Array of current files
  currentFiles: File[] = [];

  constructor(private paintingService: PaintingService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addPaintingForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      price: this.price,
      status: this.status,
      category: this.category,
      images: this.formBuilder.array([])
    });
    this.addPaintingForm.valueChanges.subscribe((changedObj: any) => {
      this.formValid = this.addPaintingForm.valid;
    });
    this.categoryList = this.paintingService.getCategoryList();
    this.statusList = this.paintingService.getStatusList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  save() {
    // Build form data
    const formDataPainting = new FormData();
    formDataPainting.append('title', this.title.value);
    formDataPainting.append('description', this.description.value);
    formDataPainting.append('price', this.price.value);
    formDataPainting.append('status', this.status.value.value);
    formDataPainting.append('category', this.category.value.value);
    // Send form data
    this.paintingService.savePainting(formDataPainting)
      .toPromise()
      .then(
        data => [
          console.log('success', data),
          this.savedPainting = data,
          this.saveImages()
        ],
        error => console.error('An error occurred:', error)
      );
    // Go to list
    this.gotoList();
  }

  saveImages() {
    const formDataImages = new FormData();
    formDataImages.append('paintingId', this.savedPainting.id.toString());
    this.currentFiles.forEach(file => {
      formDataImages.append('images', file, file.name);
    });
    // Send form data
    this.paintingService.saveImages(formDataImages)
      .subscribe(
        data => console.log('success', data),
        error => console.error('An error occurred:', error)
      );
  }

  newPainting(): void {
    this.submitted = false;
    this.addPaintingForm.reset();
  }

  gotoList() {
    this.router.navigate(['admin/paintings']);
  }

  // Adds files to list of current files
  addFilesToCurrentFiles(event) {
    for (const file of event.files) {
      this.currentFiles.push(file);
    }
  }
  // Removes a file from list of current files
  removeFileFromCurrentFiles(event) {
    const nameToRemove = event.file.name;
    for (let i = 0; i < this.currentFiles.length; i++) {
      if (this.currentFiles[i].name === nameToRemove) {
        this.currentFiles.splice(i, 1);
      }
    }
  }
  // Clears current files
  clearCurrentFiles() {
    this.currentFiles.length = 0;
  }

}
