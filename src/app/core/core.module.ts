import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { HttpClientModule, HttpRequest, HttpResponse } from '@angular/common/http';
import { AnchoService } from './services/ancho.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNgModule } from '../components/shared/prime-ng.module';


@NgModule({
  imports: [
    HttpClientModule,
    
  ],
  providers: [
    AnchoService,
    MessageService,
    ConfirmationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {

}
