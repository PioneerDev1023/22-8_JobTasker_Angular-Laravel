import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beatasker',
  templateUrl: './beatasker.component.html',
  styleUrls: ['./beatasker.component.scss']
})
export class BeataskerComponent implements OnInit {
  
  isQuestion: number = 0;

  constructor() { }

  ngOnInit() {
  }

  changeAccordion(contentId : number) : void {
    this.isQuestion = contentId;
  }

}
