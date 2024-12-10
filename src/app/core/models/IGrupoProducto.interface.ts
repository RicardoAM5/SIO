import { IGrupo } from "./IGrupo.interface";
import { IProducto } from "./IProducto.interface";


export interface IGrupoProducto {
    idGrupoProducto: number;
    grupo: IGrupo;
    producto:IProducto;
    
}