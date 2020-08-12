import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormBuilderModule } from '@jaspero/form-builder';
import { LoadClickModule } from '@jaspero/ng-helpers';
import { LayoutComponent } from './components/layout/layout.component';
import { RendererComponent } from './components/renderer/renderer.component';
import { MaterialModule } from './material.module';

const IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  FormsModule,
  HttpClientModule,

  // Material
  MaterialModule,

  // Other external
  LoadClickModule,
  FormBuilderModule
];

const COMPONENTS = [
  LayoutComponent,
  RendererComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...IMPORTS],
  exports: [...IMPORTS, ...COMPONENTS],
})
export class SharedModule {
}
