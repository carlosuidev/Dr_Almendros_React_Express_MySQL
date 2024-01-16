import { pool } from "../db.js";

export const index = (req, res) => res.json({ message: "welcome to my api" });

export const ping = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT "pong" as result');
    res.send(200).json(result[0]);
  } catch (error) {
    res.send(500).json({message: 'No se puede obtener PONG', error: error})
  }
};
