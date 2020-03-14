import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.jumbotron').css({ height: $(window).height() + 'px' });
    $(window).on('resize', function() {
      $('.jumbotron').css({ height: $(window).height() - 90 + 'px' });
    });
  }

}
