import {Request,Response} from 'express';
import pool from '../database';
class RolesController
{
    public async listar(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM Roles');
        res.json( respuesta );
    }
    public async listarUno(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM Roles WHERE id = ?', [id]);
        if(respuesta.length > 0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Rol no encontrado'});
    }
    public async crear(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO Roles set ?", [req.body]);
        res.json(resp);
    }
    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE Roles set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM Roles WHERE id = ${id}`);
        res.json(resp);
    }
}
export const rolesController = new RolesController();