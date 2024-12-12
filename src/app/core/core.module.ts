import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AnchoService } from './services/ancho.service';
import { CalibreService } from './services/calibre.service';
import { CategoriaService } from './services/categoria.service';
import { ClaseService } from './services/clase.service';
import { ClasificacionService } from './services/clasificacion.service';
import { DivisionService } from './services/division.service';
import { GradoService } from './services/grado.service';
import { GramajeService } from './services/gramaje.service';
import { MolinoService } from './services/molino.service';
import { TipoService } from './services/tipo.service';
import { ProductoMaestroService } from './services/producto-maestro.service';
import { ProductoService } from './services/producto.service';
import { EstadisticaService } from './services/estadistica.service';


@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    AnchoService,
    CalibreService,
    CategoriaService,
    ClaseService,
    ClasificacionService,
    DivisionService,
    GradoService,
    GramajeService,
    MolinoService,
    TipoService,
    ProductoMaestroService,
    ProductoService,
    EstadisticaService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {

}
