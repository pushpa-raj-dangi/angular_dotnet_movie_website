import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css'],
})
export class MarkdownComponent implements OnInit {
  @Input()
  markdownContent: any;
  @Output()
  changeMarkDown = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
}
