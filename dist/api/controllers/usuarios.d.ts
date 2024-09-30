import { Request, Response } from 'express';
export declare const Registrar: (req: Request, res: Response) => Promise<void>;
export declare const actualizarUsuario: (req: Request, res: Response) => Promise<void>;
export declare const eliminarUsuario: (req: Request, res: Response) => Promise<void>;
export declare const obtenerUsuario: (req: Request, res: Response) => Promise<void>;
