import { Component, OnInit } from '@angular/core';
import * as SimpleMDE from 'simplemde';
import * as Showdown from 'showdown';

@Component({
  selector: 'app-edit-post-text',
  templateUrl: './edit-post-text.component.html',
  styleUrls: ['./edit-post-text.component.scss']
})
export class EditPostTextComponent implements OnInit {

  constructor() { }
  htmlContent = '';
  markdownEditor: SimpleMDE;
  useMarkdown: boolean;
  chooseEditor: boolean;

  ngOnInit(): void {
  }

  useQuill(): void {
    this.chooseEditor = true;
  }

  useMarkdownEditor(value: string = null): void {
    this.chooseEditor = true;
    this.useMarkdown = true;
    setTimeout(() =>
    this.markdownEditor = new SimpleMDE({
      element: document.getElementById('markdown-editor'),
      initialValue: value ?? '',
      spellChecker: false,
    }), 50);
  }

  getMarkdownContent(): string {
    if (this.useMarkdown) {
      return this.markdownEditor.value();
    } else {
      const converter = new Showdown.Converter();
      return converter.makeMarkdown(this.htmlContent);
    }
  }
}
