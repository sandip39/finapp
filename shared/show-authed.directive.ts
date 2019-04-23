import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { AuthenticationService } from '../_services/authentication.service';


@Directive({ selector: '[showAuthed]' })
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthenticationService,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;

@Input() set showAuthed(condition: boolean) {
    //console.log(condition);
    this.condition = condition;
  }

  ngOnInit() {
    //console.log("This is a test");
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    )
  }

}
