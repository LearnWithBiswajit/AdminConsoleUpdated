import { Response } from 'express';
import { IPdfServices } from './interfaces/pdf.interface';
import { UUID } from 'crypto';
export declare class PdfContoller {
    private readonly usersService;
    constructor(usersService: IPdfServices);
    logger: any;
    streamPdf(res: Response, id: UUID): any;
}
