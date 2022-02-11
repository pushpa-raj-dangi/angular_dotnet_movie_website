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

  @Input()
    label = "Value"
  constructor() {}

  ngOnInit(): void {}
}
