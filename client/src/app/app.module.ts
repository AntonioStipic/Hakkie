import { HttpClientModule } from '@angular/common/http';
import { CompilerConfig, JitCompiler } from '@angular/compiler';
import { Compiler, COMPILER_OPTIONS, CompilerFactory, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
// import { JitCompilerFactory } from '@angular/compiler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_FIELDS, DbService, FormBuilderModule, ROLE, STORAGE_URL, StorageService } from '@jaspero/form-builder';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockDbService } from './mock/mock-db.service';
import { MockStorageService } from './mock/mock-storage.service';

/* Compiler Factory for HtmlRenderer Component purpouses */
// export function createCompiler(compilerFactory: CompilerFactory) {
//   return compilerFactory.createCompiler();
// }

export function createJitCompiler() {
  return new JitCompilerFactory().createCompiler();
  // return new JitCompilerFactory().createCompiler([{
  //   // useDebug: false,
  //   useJit: true
  // }]);
}

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

// console.log(BrowserModule);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormBuilderModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    },
    /**
     * FormBuilder
     */
    {
      provide: ROLE,
      useValue: 'admin'
    },
    {
      provide: STORAGE_URL,
      useValue: ''
    },
    {
      provide: CUSTOM_FIELDS,
      useValue: {}
    },
    {
      provide: StorageService,
      useClass: MockStorageService
    },
    {
      provide: DbService,
      useClass: MockDbService
    },

    /**
     * HTML Renderer
     */
    // {
    //   provide: Compiler,
    //   useFactory: createJitCompiler
    // },
    // {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    // {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    // {provide: JitCompiler, useFactory: createJitCompiler, deps: [CompilerFactory]},
    // {provide: Compiler, useFactory: createJitCompiler, deps: [CompilerFactory]},
    // {provide: CompilerConfig, useValue: new CompilerConfig()}

    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}

    // {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    // {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    // {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// { provide: COMPILER_OPTIONS, useValue: {}, multi: true},
// { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
// { provide: JitCompiler, useFactory: createCompiler, deps: [CompilerFactory]},
// { provide: CompilerConfig, useValue: new CompilerConfig() }

// {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
// {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
// {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
