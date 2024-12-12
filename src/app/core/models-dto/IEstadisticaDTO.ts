export interface IProducotCompletoDTO {
    idProductoMaestro: number;
    tipo: string;
    clase: string;
    molino: string;
    grado : string;
    clasificacion: string;
    idProducto:number;
    ancho: number;
    calibre: number;
    gramaje: number;
    categoria: string;
    division: string;
    estatus: boolean;
    inventario: number;
}



export interface IProductoConsumoDTO {
    fechaConsumo: Date;
    cantidadConsumo: number;
}


export interface IEstadisticaDTO {
     sumatoria: number;
     media: number;
     mediaPersonalizada: number;
     varianza: number;
     desviacionEstandar: number;
     coeficienteVariacion: number;
     pronosticoLineal: number;
}