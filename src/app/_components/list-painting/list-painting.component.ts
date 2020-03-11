import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Painting} from '../../_models/painting';
import {PaintingService} from '../../_services/painting.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-painting',
  templateUrl: './list-painting.component.html',
  styleUrls: ['./list-painting.component.css']
})
export class ListPaintingComponent implements OnInit {
  paintings: Observable<Painting[]>;
  paintingsArray: Painting[];
  cols: any[];
  statusList;
  categoryList;

  constructor(
    private paintingService: PaintingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPaintingList();
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'description', header: 'Description' },
      { field: 'price', header: 'Price' },
      { field: 'status', header: 'Status' },
      { field: 'category', header: 'Category' },
      { field: 'dateAdded', header: 'Date added' }
    ];
    this.categoryList = this.paintingService.getCategoryList();
    this.statusList = this.paintingService.getStatusList();
  }

  getPaintingList() {
    this.paintings = this.paintingService.getPaintingsList();
    this.paintingService.getPaintingsListForTable().then(data => this.paintingsArray = data);
  }

  deletePainting(id: number) {
    this.paintingService.deletePainting(id)
      .subscribe(
        data => {
          console.log(data);
          this.getPaintingList();
        },
        error => console.log(error));
  }

  paintingDetails(id: number) {
    this.router.navigate(['admin/paintings/details', id]);
  }

}
