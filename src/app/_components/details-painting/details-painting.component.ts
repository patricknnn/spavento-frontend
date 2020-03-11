import { Component, OnInit } from '@angular/core';
import {Painting} from '../../_models/painting';
import {DBImage} from '../../_models/dbimage';
import {ActivatedRoute, Router} from '@angular/router';
import {PaintingService} from '../../_services/painting.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-details-painting',
  templateUrl: './details-painting.component.html',
  styleUrls: ['./details-painting.component.css']
})
export class DetailsPaintingComponent implements OnInit {
  id: number;
  painting: Painting;
  images: DBImage[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private paintingService: PaintingService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.painting = new Painting();
    this.id = this.route.snapshot.params.id;

    // Get painting
    this.paintingService.getPainting(this.id)
      .subscribe(data => {
        console.log(data);
        this.painting = data;
      }, error => console.log(error));

    // Get images
    this.paintingService.getImages(this.id)
      .subscribe(data => {
        console.log(data);
        this.images = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['admin/paintings/']);
  }

  editPainting() {
    this.router.navigate(['admin/paintings/update', this.painting.id]);
  }

  public convertImage(dbImage: DBImage) {
    const objectURL = 'data:' + dbImage.fileType + ';base64,' + dbImage.data;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

}
