/**
 * Definimos el tipo de datos de las peticiones
 */
export type RequestType = {
  type: 'add' | 'update' | 'delete' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
}

/**
 * Definimos el tipo de datos de las respuestas
 */
export type ResponseType = {
  type: 'add' | 'update' | 'delete' | 'read' | 'list';
  success: boolean; // True ok, false not ok
  notes?: string[];
}
