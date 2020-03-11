import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Painting} from '../_models/painting';

const API_URL = 'http://localhost:8080/api/painting/';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {

  constructor(private http: HttpClient) { }

  getPaintingsList(): Observable<any> {
    return this.http.get(API_URL + 'list');
  }

  getPaintingsListForTable() {
    return this.http.get(API_URL + 'list')
      .toPromise()
      .then(data => data as Painting[])
      .then(data => data);
  }

  getPainting(id: number): Observable<any> {
    return this.http.get(API_URL + id);
  }

  updatePainting(id: number, value: any): Observable<object> {
    return this.http.get(API_URL + id, value);
  }

  deletePainting(id: number): Observable<any> {
    return this.http.get(API_URL + id, {responseType: 'text'});
  }

  /**
   * Save painting and images
   * @param data Data to be saved
   */
  savePainting(data: any): Observable<Painting> {
    return this.http.post<any>(API_URL + 'savePainting', data);
  }
  saveImages(data: any): Observable<object> {
    return this.http.post<any>(API_URL + 'saveImages', data);
  }

  /**
   * Get list of images for given Painting id
   * @param paintingId ID of painting
   */
  getImages(paintingId: number): Observable<any> {
    return this.http.get(API_URL + 'getImages/' + paintingId);
  }

  /**
   * Delete image by id
   * @param id ID of image
   */
  deleteImage(id: number): Observable<any> {
    return this.http.get(API_URL + 'deleteImage/' + id, {responseType: 'text'});
  }

  getStatusList() {
    return [
      {label: 'For sale', value: 'For sale'},
      {label: 'Not for sale', value: 'Not for sale'},
      {label: 'Reserved', value: 'Reserved'},
      {label: 'Sold', value: 'Sold'}
    ];
  }

  getCategoryList() {
    return [
      {label: 'Oil', value: 'Oil'},
      {label: 'Watercolor', value: 'Watercolor'},
      {label: 'Pastel', value: 'Pastel'},
      {label: 'Acrylic', value: 'Acrylic'}
    ];
  }
}
