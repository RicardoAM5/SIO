import { IAncho } from "./IAncho.interface";
import { ICalibre } from "./ICalibre.interface";
import { ICategoria } from "./ICategoria.interface";
import { IGramaje } from "./IGramaje.interface";
import { IProductoMaestro } from "./IProductoMaestro.interface";

export interface IProducto {
    idProducto: number;
    productoMaestro: IProductoMaestro;
    anchoReal:IAncho;
    calibreReal: ICalibre;
    gramajeReal: IGramaje;
    categoria: ICategoria;
    estatus: boolean;
}