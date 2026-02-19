import { UUID } from "crypto";
import { Response } from "express";
export interface IPdfServices {
    streamPDF(res: Response, id: UUID): Promise<any>;
}
