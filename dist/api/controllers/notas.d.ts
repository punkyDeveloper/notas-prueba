import { Request, Response } from 'express';
export declare const crearNota: (req: Request, res: Response) => Promise<void>;
export declare const obtenerNotas: (req: Request, res: Response) => Promise<void>;
export declare const obtenerNotaPorId: (req: Request, res: Response) => Promise<void>;
export declare const actualizarNota: (req: Request, res: Response) => Promise<void>;
export declare const eliminarNota: (req: Request, res: Response) => Promise<void>;
export declare const obtenerNotasPorUsuarioId: (req: Request, res: Response) => Promise<void>;
