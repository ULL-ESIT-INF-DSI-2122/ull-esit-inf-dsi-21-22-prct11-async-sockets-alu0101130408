/**
 * Definimos el tipo de datos de las peticiones
 * @param type  tipo de valor que puede tener la peticion
 * @param user usuario que hace la peticion
 * @param title opcional, titulo de la nota
 * @param body opcional, cuerpo de la nota
 * @param color opcional, color de la nota
 */
export type RequestType = {
  type: 'add' | 'modify' | 'delete' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
}

/**
 * Definimos el tipo de datos de las respuestas
 * @param type tipo de valor que tendra la respuesta
 * @param success flag que devuelve true si hubo exito en la operacion o false si hubo problemas
 * @param notes lista de notas opcional que se manda en la respuesta
 */
export type ResponseType = {
  type: 'add' | 'modify' | 'delete' | 'read' | 'list';
  success: boolean; // True ok, false not ok
  notes?: string[];
}
