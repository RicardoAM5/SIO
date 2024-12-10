import { IAgrupacionProducto } from "./IAgrupacionProducto.interface";
import { IGrupo } from "./IGrupo.interface";

export interface IAgrupacion {
    idAgrupacion: number;
    ancho: number;
    descripcion: string;
    cobertura: number;
    estado: boolean;
    fechaCreacion: Date;
    grupo: IGrupo;
    agrupacionProductos: IAgrupacionProducto[];
}