import { IAgrupacion } from "./IAgrupacion.interface";
import { IProducto } from "./IProducto.interface";

export interface IAgrupacionProducto {
    idAgrupacionProducto: number;
    agrupacion: IAgrupacion;
    producto: IProducto;
    
}
