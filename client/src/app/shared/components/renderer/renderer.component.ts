import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Compiler,
  Component,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  @Input()
  code: string = '';

  constructor(private compiler: Compiler,
              private injector: Injector,
              private _m: NgModuleRef<any>) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.ngOnChanges();
  }

  ngOnChanges() {
    const template = this.code;

    const tmpCmp = Component({template: template})(class {
    });
    const tmpModule = NgModule({declarations: [tmpCmp], imports: [CommonModule, MaterialModule]})(class {
    });

    this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        this.vc.clear();
        const cmpRef = this.vc.createComponent(f);
        // cmpRef.instance.name = 'dynamic';
      });
  }
}
