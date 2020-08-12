import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilderComponent } from '@jaspero/form-builder';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ComponentInterface } from '../../shared/interfaces/component.interface';

@UntilDestroy()
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  @ViewChildren(FormBuilderComponent)
  formComponents: QueryList<FormBuilderComponent>;

  components: ComponentInterface[] = [
    {
      name: 'Container',
      type: 'any',
      content: `<div class="p-a-m">{{html}}</div>`,
      style: '',
      selector: 'container',
      parameters: []
    },
    {
      name: 'Test Component',
      type: 'any',
      content: `
        <mat-toolbar color="{{color}}" class="flex">
          <span>{{title}}</span>
          <div class="flex-1"></div>
          <button mat-icon-button>
            <mat-icon>{{icon}}</mat-icon>
          </button>
        </mat-toolbar>
      `,
      style: '',
      selector: 'navbar',
      parameters: [{
        name: 'title',
        defaultValue: 'Title'
      }, {
        name: 'color',
        defaultValue: 'primary'
      },
        {
          name: 'icon',
          defaultValue: 'add'
        }]
    },
    {
      name: 'Footer',
      selector: 'footer',
      content: `
      <div style="position: absolute; height: 100px; bottom: 0" class="w-full bg-accent flex"><ng-container *ngIf="{{includeLogo === 'true'}}"><div class="flex-1"><img src="{{logo}}" class="h-full"/></div></ng-container><div class="flex-2">{{html}}</div></div>`,
      parameters: [
        {
          name: 'includeLogo',
          defaultValue: 'false'
        },
        {
          name: 'logo',
          defaultValue: 'https://e7.pngegg.com/pngimages/3/411/png-clipart-logo-font-brand-black-m-temporary-tattoos-text-logo.png'
        }
      ]
    }
  ];

  monacoCode: string;
  code: string;
  editorOptions = {theme: 'vs-light', language: 'html'};

  constructor() {
  }

  ngOnInit(): void {
  }

  async updateCode(code) {
    this.code = unescape(await this.parse(code));
  }

  async parse(code) {
    const doc = document.createElement('div');
    doc.innerHTML = code;


    await this.scanChildren(doc);

    // TODO: innerHTML converts attribute names to lowercase
    return doc.outerHTML.replace('*ngif', '*ngIf');
  }

  async scanChildren(element: Element) {
    await this.asyncForEach(Array.from(element.children), async (child: Element) => {
      if (child.children.length > 0) {
        await this.scanChildren(child);
      }

      if (!child.tagName.startsWith('JP-')) {
        return;
      }
      const selector = child.tagName.toLowerCase().slice('JP-'.length);
      // const attributes = Array.from(child.attributes).reduce((acc, curr) => {
      //   acc[curr.name] = curr.value;
      //   return acc;
      // }, {});
      const options = eval(`(${child.attributes.getNamedItem('opts')?.value || '{}'})`);
      const classes = child.className;
      const component = document.createElement('div');
      component.className = classes;

      const scaffold = this.components.find(component => component.selector === selector);
      let html = scaffold?.content || `Component '${selector}' Not Found`;

      html = html.replace(/{{html}}/g, child.innerHTML);
      const customMatch = (html.match(/\{{([^}]+)\}}/g) || []).filter(match => match !== '');
      customMatch.forEach(match => {
        let replace = match.slice(2, -2);
        const variables = replace.split(' ');
        variables.forEach(variable => {
          let reservedWord = false;
          try {
            eval('var ' + variable + ' = 1');
          } catch {
            reservedWord = true;
          }

          if (!reservedWord) {
            replace = replace.replace(variable, `'${options[variable] || scaffold.parameters.find(parameter => parameter.name === variable)?.defaultValue}'`);
          }
        });
        replace = eval(replace);
        html = html.replace(match, replace);
      });

      component.innerHTML = html;
      element.replaceChild(component, child);
    });
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

