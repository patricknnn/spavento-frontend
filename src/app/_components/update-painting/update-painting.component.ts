import { Component, OnInit } from '@angular/core';
import {Painting} from '../../_models/painting';
import {DBImage} from '../../_models/dbimage';
import {ActivatedRoute, Router} from '@angular/router';
import {PaintingService} from '../../_services/painting.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-painting',
  templateUrl: './update-painting.component.html',
  styleUrls: ['./update-painting.component.css']
})
export class UpdatePaintingComponent implements OnInit {
  // Form related
  public updatePaintingForm: FormGroup;
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  price = new FormControl('');
  status = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  categoryList;
  statusList;
  id: number;
  painting: Painting;
  images: DBImage[];
  submitted = false;
  formValid = false;
  // Array of new files
  newFiles: File[] = [];
  // Array of current files urls used for displaying current files
  newFileUrls: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private paintingService: PaintingService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.painting = new Painting();
    this.id = this.route.snapshot.params.id;
    this.categoryList = this.paintingService.getCategoryList();
    this.statusList = this.paintingService.getStatusList();

    this.paintingService.getPainting(this.id)
      .toPromise()
      .then(data => {
        console.log(data);
        this.painting = data;
        this.loadPaintingDetails();
      }, error => console.log(error));

    this.loadPaintingDetails();
    this.reloadImages();
  }

  onSubmit() {
    this.submitted = true;
    this.updatePainting();
    if (this.newFiles.length) {
      this.saveImages();
    }
  }

  reloadImages() {
    // Get images
    this.paintingService.getImages(this.id)
      .subscribe(data => {
        console.log(data);
        this.images = data;
      }, error => console.log(error));
  }

  loadPaintingDetails() {
    this.title.setValue(this.painting.title);
    this.description.setValue(this.painting.description);
    this.price.setValue(this.painting.price);
    this.status.setValue(this.painting.status);
    this.category.setValue(this.painting.category);

    this.updatePaintingForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      price: this.price,
      status: this.status,
      category: this.category,
      images: this.formBuilder.array([])
    });

    this.updatePaintingForm.valueChanges.subscribe((changedObj: any) => {
      this.formValid = this.updatePaintingForm.valid;
    });
  }

  updatePainting() {
    this.painting.title = this.updatePaintingForm.get('title').value;
    this.painting.description = this.updatePaintingForm.get('description').value;
    this.painting.price = this.updatePaintingForm.get('price').value;
    this.painting.status = this.updatePaintingForm.get('status').value;
    this.painting.category = this.updatePaintingForm.get('category').value;
    this.paintingService.updatePainting(this.id, this.painting)
      .subscribe(data => console.log(data), error => console.log(error));

    this.painting = new Painting();
    this.gotoList();
  }

  saveImages() {
    // Build form data
    const formDataImages = new FormData();
    formDataImages.append('paintingId', this.painting.id.toString());
    this.newFiles.forEach(file => {
      formDataImages.append('images', file, file.name);
    });

    // Send form data
    this.paintingService.saveImages(formDataImages)
      .subscribe(
        data => console.log('success', data),
        error => console.error('An error occurred:', error)
      );
  }

  public convertImage(dbImage: DBImage) {
    const objectURL = 'data:' + dbImage.fileType + ';base64,' + dbImage.data;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  public deleteImage(id: number) {
    this.paintingService.deleteImage(id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.reloadImages();
  }

  gotoList() {
    this.router.navigate(['/admin/paintings']);
  }

  // Fired on file selection
  detectFiles(event) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        this.newFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.newFileUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(i) {
    // remove images from files and urls arrays
    this.newFiles.splice(i, 1);
    this.newFileUrls.splice(i, 1);
  }

}
