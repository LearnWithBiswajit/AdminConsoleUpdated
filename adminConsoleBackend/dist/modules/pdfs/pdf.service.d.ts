import { IPdfServices } from './interfaces/pdf.interface';
import { Response } from 'express';
import { IDeviceRepository } from '../devices/interfaces/device.interface';
import { UUID } from 'crypto';
export declare class PdfService implements IPdfServices {
    private readonly deviceRepository;
    constructor(deviceRepository: IDeviceRepository);
    logger: any;
    streamPDF(res: Response, id: UUID): Promise<any>;
}
