import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsComponent } from './components.component';

const JASPERO_COMPONENTS = ['container', 'navbar', 'footer'];

const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: () => {
    const monaco = window.monaco;
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems(model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
        return {
          suggestions: JASPERO_COMPONENTS.map(selector => {
            return {label: `jp-${selector}`, kind: 9, insertText: `jp-${selector}>\n</jp-${selector}>`, range: null}
          })
        };
      }
    });
  }
};

const routes = [
  {
    path: '',
    component: ComponentsComponent
  }
];

const COMPONENTS = [
  ComponentsComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: []
})
export class ComponentsModule {
}
