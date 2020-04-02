/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const generateToken = payload => jwt.sign({ payload }, process.env.SECRET, { expiresIn: '10h' });

export const verifyToken = token => jwt.verify(token, process.env.SECRET);

export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (hashedPassword, password) => bcrypt.compareSync(password, hashedPassword);
