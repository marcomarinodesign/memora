export interface ActaData {
  comunidad: {
    nombre: string;
    direccion: string;
    ciudad: string;
    nif: string;
  };
  cabecera: {
    codigo_acta: string;
    fecha: string;
    hora_inicio: string;
    modalidad: string;
    presidente: string;
    secretario: string;
  };
  orden_dia: Array<{ punto_id: number; titulo: string }>;
  asistentes: Array<{
    departamento: string;
    coeficiente: number;
    propietario: string;
    representante: string;
  }>;
  acuerdos: Array<{
    punto_id: number;
    resumen: string;
    decisiones: string[];
    resultado: string;
  }>;
  fondos: Array<{
    nombre: string;
    saldo_anterior: number;
    ingresos: number;
    gastos: number;
    saldo_actual: number;
  }>;
  cargos: {
    presidente: string;
    vicepresidente: string;
    secretario_admin: string;
  };
  cierre: {
    hora_fin: string;
  };
}

interface ActaTemplateProps {
  data: ActaData;
}

export default function ActaTemplate({ data }: ActaTemplateProps) {
  return (
    <div className="acta-template p-6 max-w-4xl mx-auto">
      <h1 className="max-w-[800px] heading-xl text-foreground text-[64px] font-extrabold tracking-[-2px] mb-4">Acta de reunión</h1>
      <p className="text-sm text-gray-600">
        {data.comunidad.nombre} · {data.comunidad.ciudad}
      </p>
      <p className="text-sm text-gray-600 mb-6">
        {data.cabecera.fecha} · {data.cabecera.hora_inicio} - {data.cierre.hora_fin}
      </p>
      <p className="text-sm">{data.cabecera.modalidad}</p>
    </div>
  );
}
