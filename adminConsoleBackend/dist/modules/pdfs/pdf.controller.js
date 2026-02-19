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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfContoller = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
const publicRoute_decorator_1 = require("../../decorators/publicRoute.decorator");
const crypto_1 = require("crypto");
let PdfContoller = class PdfContoller {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    logger = new common_1.Logger();
    streamPdf(res, id) {
        try {
            this.usersService.streamPDF(res, id);
        }
        catch (error) {
            this.logger.error("This error occurred in PDF Services. Method Name: streamPDF", error);
            return Promise.reject(error);
        }
    }
};
exports.PdfContoller = PdfContoller;
__decorate([
    (0, publicRoute_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Downloda Pdf',
        description: 'Download the pdf with users information'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id of the device',
        type: String
    }),
    (0, common_1.Get)('pdf/:id'),
    __param(0, (0, common_1.Res)({ passthrough: false })),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, typeof (_b = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], PdfContoller.prototype, "streamPdf", null);
exports.PdfContoller = PdfContoller = __decorate([
    (0, swagger_1.ApiTags)('pdf'),
    (0, common_1.Controller)('pdf'),
    __param(0, (0, common_1.Inject)("IPdfServices")),
    __metadata("design:paramtypes", [Object])
], PdfContoller);
//# sourceMappingURL=pdf.controller.js.map