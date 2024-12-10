import { IAncho } from "./IAncho.interface";
import { ICalibre } from "./ICalibre.interface";
import { IClase } from "./IClase.interface";
import { IClasificacion } from "./IClasificacion.interface";
import { IGrado } from "./IGrado.interface";
import { IGramaje } from "./IGramaje.interface";
import { IMolino } from "./IMolino.interface";
import { ITipo } from "./ITipo.interface";

export interface IProductoMaestro {
idProductoMaestro: number;
tipo: ITipo,
clase: IClase,
calibre : ICalibre,
gramaje: IGramaje,
molino: IMolino,
grado: IGrado,
ancho: IAncho,
clasificacion: IClasificacion,
estatus: boolean;

}