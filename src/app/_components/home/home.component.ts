import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../_services/home.service';
import {DBImage} from '../../_models/dbimage';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paintingList: any;

  constructor(private homeService: HomeService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.homeService.getPaintingList().subscribe(
      data => {
        this.paintingList = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  public convertImage(dbImage: DBImage) {
    const objectURL = 'data:' + dbImage.fileType + ';base64,' + dbImage.data;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

}
