import {Request,Response} from 'express';
import pool from '../database';

class TallasController
{
    public async listar(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM Tallas');
        res.json( respuesta );
    }

    public async listarUno(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM Tallas WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Talla no encontrada'});
    }

    public async crear(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO Tallas set ?", [req.body]);
        res.json(resp);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE Tallas set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("DELETE FROM Tallas WHERE id = ?", [id]);
        res.json(resp);
    }
}
export const tallasController = new TallasController();