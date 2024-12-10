import { NgModule} from '@angular/core';
import { HttpClientModule, HttpRequest, HttpResponse } from '@angular/common/http';
import { AnchoService } from './services/ancho.service';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../components/shared/prime-ng.module';


@NgModule({
  imports: [
    HttpClientModule,
    
  ],
  providers: [
    //aqui se agregan los servicios
    AnchoService,
    MessageService

  ],
})
export class CoreModule {

}
