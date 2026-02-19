"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require("pdfkit");
const device_mapper_1 = require("../devices/mapper/device.mapper");
const path = require("path");
const fs = require("fs/promises");
const enum_config_1 = require("../../config/enum.config");
let PdfService = class PdfService {
    deviceRepository;
    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
    }
    logger = new common_1.Logger();
    async streamPDF(res, id) {
        try {
            const doc = new PDFDocument({ size: 'A4' });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="arc-system-form.pdf"');
            doc.pipe(res);
            const imagePath = path.join(__dirname, '..', '..', '..', 'assets', 'image.png');
            const imageBuffer = await fs.readFile(imagePath);
            doc.image(imagePath, 235, 20, { width: 120 });
            doc.moveDown(1);
            let device = await this.deviceRepository.getDeviceById(id);
            let resp = device_mapper_1.DeviceMapper.mapToDto(device);
            doc.fontSize(14).font('Helvetica-Bold').text('ARC System Requisition Form', { align: "center", underline: true });
            doc.moveDown(1);
            const box = (label, val = '', width = 400) => {
                doc.text(label, 50);
                const y = doc.y;
                doc.rect(doc.x, y, 500, 23).stroke();
                doc.text(val, doc.x + 5, y + 7);
                doc.moveDown(1.5);
            };
            const box2 = (label, val = '', width = 200) => {
                doc.text(label, 50);
                const y = doc.y;
                doc.rect(doc.x, y, width, 23).stroke();
                doc.text(val, doc.x + 5, y + 7, { lineBreak: false });
                doc.moveDown(1.5);
            };
            const box3 = (label, val = '', width = 400) => {
                doc.font('Helvetica-Bold').text(label, 50, doc.y, { lineBreak: false });
                const y = doc.y;
                doc.rect(doc.x + 10, y - 5, width, 22).stroke();
                doc.text(val, doc.x + 10, y + 2);
                doc.moveDown(1.5);
            };
            const box4 = (label, val = '', width = 200) => {
                doc.font('Helvetica-Bold').fontSize(12).text(label, 300, doc.y, { lineBreak: false });
                const y = doc.y;
                doc.rect(doc.x + 10, y - 5, width, 23).stroke();
                doc.fontSize(12).text(val, doc.x + 20, y + 2);
                doc.moveDown(1.5);
            };
            box('Requested By:', '');
            box('Requested For:', '');
            doc.moveDown();
            box3('Joining Date:', '');
            box2('Requested On:', '');
            doc.moveUp(2.5);
            box4('Employee ID:', '', 170);
            doc.moveDown();
            box4('Department:', '', 174);
            doc.moveDown(1);
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
                }
                else {
                    doc.rect(doc.x + 20, doc.y, 10, 10).stroke();
                    doc.text(`  ${item}   `, doc.x + 35, doc.y, { continued: true, lineBreak: false });
                }
            });
            doc.moveDown().text('Custom:', 310, doc.y - 10, { continued: true });
            doc.rect(doc.x - 160, doc.y - 10, 150, 40).stroke();
            doc.text("", doc.x - 190, doc.y - 10);
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
                    doc.font('Helvetica').text(`  ${item}   `, 65, doc.y, { continued: true, lineBreak: false });
                }
                else {
                    doc.rect(doc.x + 20, doc.y, 10, 10).stroke();
                    doc.text(`  ${item}   `, doc.x + 25, doc.y, { continued: true, lineBreak: false });
                }
            });
            doc.moveDown();
            doc.moveDown(1).font('Helvetica-Bold').text('Additional Software (Department-Specific):', 50);
            doc.rect(50, doc.y, 500, 40).stroke();
            doc.font('Helvetica').text("", 65);
            doc.moveDown(2);
            doc.moveDown().font('Helvetica-Bold').text('Operating System (Mention the version):', 50, doc.y, { lineBreak: false });
            doc.rect(doc.x + 10, doc.y, 230, 23).stroke();
            doc.font('Helvetica').text('', doc.x + 10, doc.y);
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
            doc.moveDown(1.5);
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
            const drawField = (label, value = '', height = 0) => {
                doc.font('Helvetica-Bold').text(label, 50, doc.y, { lineBreak: false });
                const y = doc.y;
                doc.rect(50 + labelWidth, y - 5, 360, 22 + height).stroke();
                if (value)
                    doc.font('Helvetica').text(value || '', 55 + labelWidth, y - 1), { lineBreak: false };
                doc.moveDown(1);
            };
            drawField('Serial Number', device.serialNumber);
            doc.moveDown(0.5);
            drawField('Model Number', '');
            doc.moveDown(1);
            drawField('Brand Name', enum_config_1.BrandName[device.brand]);
            doc.moveDown(0.5);
            drawField('MAC Address', device.macAddress?.join(', '), device.macAddress.length > 2 ? 10 : 0);
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
            doc.moveUp(1.5);
            doc.text('IT Security Personnel\nNiladri Sengupta', 240, doc.y);
            doc.moveUp(2);
            doc.text('Employee signature', 450, doc.y);
            doc.moveDown(1.5);
            doc.text('Principal Consultant-Cyber Security\nSuresh K Mishra', 20, doc.y + 25, { align: 'center' });
            doc.end();
        }
        catch (error) {
            this.logger.error("This error occurred in PDF Services. Method Name: streamPDF", error);
            return Promise.reject(error);
        }
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IDeviceRepository")),
    __metadata("design:paramtypes", [Object])
], PdfService);
//# sourceMappingURL=pdf.service.js.map