import { IAgrupacion } from "./IAgrupacion.interface";

export interface IGrupo {
    idGrupo: number;
    nombre: string;
    descripcion: string;
    identificador: string;
    valorIdentificador: string;
    estado: boolean;
    fechaCreacion: Date;    
    agrupaciones?: IAgrupacion[];
}