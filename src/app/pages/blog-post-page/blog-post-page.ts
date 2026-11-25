import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, JsonPipe],
  selector: 'app-blog-post-page',
  styleUrl: './blog-post-page.css',
  templateUrl: './blog-post-page.html',
})
export class BlogPostPage {
  categorias = ['Tecnología', 'Diseño', 'Programación', 'Novedades'];

  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  tags = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  publishNow = new FormControl(true);
  publishDate = new FormControl({ value: '', disabled: true });

  publicado: any = null;

  constructor() {
    this.publishNow.valueChanges.subscribe((ahora) => {
      if (ahora) {
        this.publishDate.reset({ value: '', disabled: true });
      } else {
        this.publishDate.enable();
      }
    });
  }

  get formularioValido() {
    const fechaOk = this.publishNow.value || !!this.publishDate.value;
    return this.title.valid && this.description.valid && this.category.valid && this.email.valid && fechaOk;
  }

  publicar() {
    this.publicado = {
      title: this.title.value,
      description: this.description.value,
      category: this.category.value,
      tags: (this.tags.value ?? '').split(',').map((t) => t.trim()).filter((t) => t),
      email: this.email.value,
      publishNow: this.publishNow.value,
      publishDate: this.publishNow.value ? new Date().toISOString().slice(0, 10) : this.publishDate.value,
    };
    console.log(this.publicado);
  }
}
