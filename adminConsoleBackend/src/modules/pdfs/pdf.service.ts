import { Inject, Injectable, Logger } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { DeviceDTO } from '../devices/dto/device.dto';// adjust the path if needed
import { IPdfServices } from './interfaces/pdf.interface';
import { Response } from 'express';
import { Device } from '../devices/entities/device.entity';
import { IDeviceRepository } from '../devices/interfaces/device.interface';
import { UUID } from 'crypto';
import { DeviceMapper } from '../devices/mapper/device.mapper';
import * as path from 'path';
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs/promises';

// import sizeOf from 'image-size';
import { BrandName } from 'src/config/enum.config';

@Injectable()
export class PdfService implements IPdfServices {
  constructor(@Inject("IDeviceRepository") private readonly deviceRepository: IDeviceRepository) { }
  logger = new Logger();
  async streamPDF(res: Response, id: UUID): Promise<any> {
    try {
      const doc = new PDFDocument({ size: 'A4' });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="arc-system-form.pdf"');

      doc.pipe(res);

      const imagePath = path.join(__dirname, '..', '..', '..', 'assets', 'image.png'); // adjust
      const imageBuffer = await fs.readFile(imagePath); // <- fix
      // const dimensions = sizeOf(imageBuffer);

      doc.image(imagePath, 235, 20, { width: 120 });
      doc.moveDown(1);

      let device: Device = await this.deviceRepository.getDeviceById(id);
      let resp: DeviceDTO = DeviceMapper.mapToDeviceDto(device);

      doc.fontSize(14).font('Helvetica-Bold').text('ARC System Requisition Form', { align: "center", underline: true });
      doc.moveDown(1);

      const box = (label: string, val: string = '', width = 400) => {
        doc.text(label, 50);
        const y = doc.y;
        doc.rect(doc.x, y, 500, 23).stroke();
        doc.text(val, doc.x + 5, y + 7);
        doc.moveDown(1.5);
      };

      const box2 = (label: string, val: string = '', width = 200) => {
        doc.text(label, 50);
        const y = doc.y;
        doc.rect(doc.x, y, width, 23).stroke();
        doc.text(val, doc.x + 5, y + 7, { lineBreak: false });
        doc.moveDown(1.5);
      };

      const box3 = (label: string, val: string = '', width = 400) => {
        doc.font('Helvetica-Bold').text(label, 50, doc.y, { lineBreak: false });
        const y = doc.y;
        doc.rect(doc.x + 10, y - 5, width, 22).stroke();
        doc.text(val, doc.x + 10, y + 2);
        doc.moveDown(1.5);
      };

      const box4 = (label: string, val: string = '', width = 200) => {
        doc.font('Helvetica-Bold').fontSize(12).text(label, 300, doc.y, { lineBreak: false });
        const y = doc.y;
        doc.rect(doc.x + 10, y - 5, width, 23).stroke();
        doc.fontSize(12).text(val, doc.x + 20, y + 2);
        doc.moveDown(1.5);
      };

      box('Requested By:', '');
      box('Requested For:', '');
      doc.moveDown()
      box3('Joining Date:', '');
      box2('Requested On:', '');
      doc.moveUp(2.5)
      box4('Employee ID:', '', 170);
      doc.moveDown()
      box4('Department:', '', 174);
      doc.moveDown(1)
      box4('Employee Type:', '', 158);

      doc.moveDown().font('Helvetica-Bold').text('System Requirements', 50, doc.y, { lineBreak: false });
      ['New System', 'Existing System', 'Replacement'].forEach((type) => {
        doc.rect(doc.x + 5, doc.y, 10, 10).stroke();
        doc.moveDown(0.5);
        doc.text(`  ${type}`, doc.x + 15, doc.y - 7, { continued: true, lineBreak: false });
      });
      doc.moveDown(1);

      doc.moveDown().font('Helvetica-Bold').text('Hardware:', 50);
      const hardwareOptions = [
        'Laptop', 'Desktop', 'MAC-Mini', 'MacBook',
        'Android', 'iOS Device', 'Server', 'Wi-Fi Dongle', 'Wi-Fi Router'
      ];
      hardwareOptions.forEach((item, i) => {
        if (i % 4 === 0) {
          doc.moveDown(1.5);
          doc.rect(50, doc.y, 10, 10).stroke();
          doc.font('Helvetica').fontSize(13).text(`  ${item}   `, 50 + 15, doc.y, { continued: true, lineBreak: false });
        } else {
          doc.rect(doc.x + 20, doc.y, 10, 10).stroke();
          doc.text(`  ${item}   `, doc.x + 35, doc.y, { continued: true, lineBreak: false });
        }
      });

      doc.moveDown().text('Custom:', 310, doc.y - 10, { continued: true });
      doc.rect(doc.x - 160, doc.y - 10, 150, 40).stroke();
      doc.text("", doc.x - 190, doc.y - 10)
      doc.moveDown(3);

      doc.font('Helvetica-Bold').text('Mandatory Software:', 50, doc.y + 10);
      const softwareOptions = [
        'Office 365', 'CrowdStrike', 'BitLocker', 'Zoom',
        'HR-One', 'Screen connect', 'Firewall On'
      ];
      softwareOptions.forEach((item, i) => {
        if (i % 4 === 0) {
          doc.moveDown(1);
          doc.rect(50, doc.y, 10, 10).stroke();
          doc.font('Helvetica').text(`  ${item}   `, 65, doc.y, { continued: true, lineBreak: false })
        } else {
          doc.rect(doc.x + 20, doc.y, 10, 10).stroke();
          doc.text(`  ${item}   `, doc.x + 25, doc.y, { continued: true, lineBreak: false });
        }
      });
      doc.moveDown()

      doc.moveDown(1).font('Helvetica-Bold').text('Additional Software (Department-Specific):', 50);
      doc.rect(50, doc.y, 500, 40).stroke();
      doc.font('Helvetica').text("", 65)// || '', doc.x + 5, doc.y + 10)
      doc.moveDown(2);

      // OS + Specs
      doc.moveDown().font('Helvetica-Bold').text('Operating System (Mention the version):', 50, doc.y, { lineBreak: false });
      doc.rect(doc.x + 10, doc.y, 230, 23).stroke();
      doc.font('Helvetica').text('', doc.x + 10, doc.y)
      doc.moveDown(2.4);
      box3('CPU:', '', 200);
      doc.moveUp(1.8);
      box4('RAM:', '', 200);
      doc.moveDown(1);
      box3('HDD:', '', 200);
      doc.moveUp(1.8);
      box4('SSD:', '', 200);

      doc.moveDown();
      box('Network Access:', '', 500);
      doc.moveDown(1.5)
      box3('If any, specify reason:', '', 360);
      doc.moveDown().font('Helvetica-Bold').text('Admin Access:', 50, doc.y, { lineBreak: false });
      ['Yes', 'No'].forEach((type) => {
        doc.rect(doc.x + 5, doc.y, 10, 10).stroke();
        doc.moveDown(0.5);
        doc.text(`  ${type}`, doc.x + 15, doc.y - 7, { continued: true, lineBreak: false });
      });

      doc.moveDown(1.5);
      box3('If yes, specify reason:', '', 360);
      doc.moveDown().font('Helvetica-Bold').text('Wi-Fi Access ', 50, doc.y, { lineBreak: false });
      ['Yes', 'No'].forEach((type) => {
        doc.rect(doc.x + 5, doc.y, 10, 10).stroke();
        doc.moveDown(0.5);
        doc.text(`  ${type}`, doc.x + 15, doc.y - 7, { continued: true, lineBreak: false });
      });
      doc.moveDown(1.5);
      doc.font('Helvetica-Bold').text('USB Access ', 50, doc.y, { lineBreak: false });
      ['Yes', 'No'].forEach((type) => {
        doc.rect(doc.x + 5, doc.y, 10, 10).stroke();
        doc.moveDown(0.5);
        doc.text(`  ${type}`, doc.x + 15, doc.y - 7, { continued: true, lineBreak: false });
      });
      doc.moveDown(1.5);
      box3('If yes, specify reason:', '', 160);
      doc.moveDown(1);
      doc.fontSize(14).font('Helvetica-Bold').text('To be filled by Network Team:', { underline: true });
      doc.moveDown(1.5);

      doc.fontSize(12).font('Helvetica');
      const labelWidth = 150;

      const drawField = (label: string, value: string = '', height:number = 0) => {
        doc.font('Helvetica-Bold').text(label, 50, doc.y, { lineBreak: false });
        const y = doc.y;
        doc.rect(50 + labelWidth, y - 5, 360, 22+height).stroke();
        if (value) doc.font('Helvetica').text(value || '', 55 + labelWidth, y - 1), { lineBreak: false };
        doc.moveDown(1);
      };

      drawField('Serial Number', device.serialNumber);
      doc.moveDown(0.5);
      drawField('Model Number', '');
      doc.moveDown(1);
      drawField('Brand Name', BrandName[device.brand]);
      doc.moveDown(0.5);
      drawField('MAC Address', device.macAddress?.join(', '), device.macAddress.length>2 ? 10 : 0);
      doc.moveDown(0.5);
      drawField('Host Name', device.hostName);
      doc.moveDown(0.5);
      drawField('Apple ID (Official)', '');
      doc.moveDown(1);
      drawField('Domain Name', 'MPTDC1-india\\');
      doc.moveDown(0);

      doc.font('Helvetica-Bold').text('Verified on master list:   ', 50, doc.y, { lineBreak: false });
      ['Yes', 'No'].forEach((type) => {
        doc.rect(doc.x + 5, doc.y, 10, 10).stroke();
        doc.moveDown(0.5);
        doc.text(`  ${type}`, doc.x + 15, doc.y - 7, { continued: true, lineBreak: false });
      });
      doc.moveDown(3);

      doc.fontSize(10);
      doc.moveDown(3).text('IT team Installer Personnel', 50, doc.y);
      doc.moveUp(1.5)
      doc.text('IT Security Personnel\nNiladri Sengupta', 240, doc.y);
      doc.moveUp(2)
      doc.text('Employee signature', 450, doc.y);
      doc.moveDown(1.5)
      doc.text('Principal Consultant-Cyber Security\nSuresh K Mishra', 20, doc.y + 25, { align: 'center' })
      doc.end();
    } catch (error) {
      this.logger.error("This error occurred in PDF Services. Method Name: streamPDF", error);
      return Promise.reject(error);
    }
  }

}
