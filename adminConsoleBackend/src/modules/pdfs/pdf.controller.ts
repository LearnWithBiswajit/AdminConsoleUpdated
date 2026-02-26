import { Controller, Get, Inject, Res, Query, Param, Logger } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { Inventory } from '../devices/dto/device.dto';
import { IPdfServices } from './interfaces/pdf.interface';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/publicRoute.decorator';
import { UUID } from 'crypto';
// import { Inventory } from '';

@ApiTags('pdf')
@Controller('pdf')
export class PdfContoller {
  constructor(@Inject("IPdfServices") private readonly usersService: IPdfServices) { }

  logger = new Logger();

  @Public()
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Downloda Pdf',
    description: 'Download the pdf with users information'
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the device',
    type: String
  })
  @Get('pdf/:id')
  streamPdf(@Res({ passthrough: false }) res: Response, @Param("id") id: UUID) {
    try {
      this.usersService.streamPDF(res, id);
    } catch (error) {
      this.logger.error("This error occurred in PDF Services. Method Name: streamPDF", error);
      return Promise.reject(error);
    }
  }
}
