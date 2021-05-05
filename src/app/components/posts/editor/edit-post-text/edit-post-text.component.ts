import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as SimpleMDE from 'simplemde';
import * as Showdown from 'showdown';
import { Post } from 'src/app/models/post';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
@Component({
  selector: 'app-edit-post-text',
  templateUrl: './edit-post-text.component.html',
  styleUrls: ['./edit-post-text.component.scss'],
})
export class EditPostTextComponent implements OnInit {
  constructor() {
    Quill.register('modules/blotFormatter', BlotFormatter);
  }
  @Input() post: Post;
  htmlContent = '';
  markdownEditor: SimpleMDE;
  useMarkdown: boolean;
  chooseEditor: boolean;
  editor: Quill;
  modules = {
    blotFormatter: {},
  };

  ngOnInit(): void {
    if (this.post && this.post.markdown?.length > 0) {
      this.useMarkdownEditor(this.post.markdown);
    } else if (this.post && this.post.html?.length > 0) {
      this.htmlContent = this.post.html;
    }
  }

  created(editor: Quill): void {
    this.editor = editor;
    const toolbar = editor.getModule('toolbar');
    toolbar.addHandler('video', (value) => {
      const tooltip = this.editor.theme.tooltip;
      const originalSave = tooltip.save;
      const originalHide = tooltip.hide;

      tooltip.save = () => {
        let textboxValue = tooltip.textbox.value;
        if (textboxValue) {
          const range = this.editor.getSelection(true);
          if (textboxValue.startsWith('https://gfycat.com/')) {
            textboxValue = textboxValue.substring('https://gfycat.com/'.length);
            const range = this.editor.getSelection(true);
            this.editor.insertEmbed(range.index, 'video', `https://gfycat.com/ifr/${textboxValue}`, 'user');
          } else {
            this.editor.insertEmbed(range.index, 'video', textboxValue, 'user');
          }
        }
      };
      // Called on hide and save.
      tooltip.hide = function () {
        tooltip.save = originalSave;
        tooltip.hide = originalHide;
        tooltip.hide();
      };
      tooltip.edit('image');
      tooltip.textbox.placeholder = 'Embed URL';

      if (value) {
      } else {
        this.editor.format('link', false);
      }
    });
  }

  useQuill(): void {
    this.chooseEditor = true;
  }

  useMarkdownEditor(value: string = null): void {
    this.chooseEditor = true;
    this.useMarkdown = true;
    setTimeout(
      () =>
        (this.markdownEditor = new SimpleMDE({
          element: document.getElementById('markdown-editor'),
          initialValue: value ?? '',
          spellChecker: false,
        })),
      50
    );
  }

  getMarkdownContent(): string {
    return this.markdownEditor?.value();
  }

  getHtmlContent(): string {
    return this.htmlContent;
  }
}
