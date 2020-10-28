import { Component, Input, OnInit } from '@angular/core';
import * as SimpleMDE from 'simplemde';
import * as Showdown from 'showdown';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-edit-post-text',
  templateUrl: './edit-post-text.component.html',
  styleUrls: ['./edit-post-text.component.scss']
})
export class EditPostTextComponent implements OnInit {

  constructor() { }
  @Input() post: Post;
  htmlContent = '';
  markdownEditor: SimpleMDE;
  useMarkdown: boolean;
  chooseEditor: boolean;

  ngOnInit(): void {
    if (this.post) {
      this.useMarkdownEditor(this.post.body);
    }
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
