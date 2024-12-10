import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AnchoService } from './services/ancho.service';


@NgModule({
  imports: [
    HttpClientModule,
 
    
  ],
  providers: [
    AnchoService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {

}
