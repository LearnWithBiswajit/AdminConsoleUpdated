"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            console.log(context.switchToHttp().getRequest()?.url);
            return {
                error: false,
                statusCode: 200,
                message: data && data.message ? data.message : 'OK',
                data: data && data.message && delete data.message ? data[Object.keys(data)[0]] : data,
            };
        }), (0, operators_1.catchError)((error) => {
            if (error instanceof common_1.HttpException) {
                if (error.message.includes('duplicate key value violates unique constraint')) {
                    throw new common_1.ConflictException('Unique key constraint violation');
                }
                throw new common_1.HttpException({
                    error: true,
                    statusCode: error.getStatus(),
                    message: error.getResponse()["message"] ? error.getResponse()["message"] : error.getResponse(),
                    data: [],
                }, error.getStatus());
            }
            else {
                if (error.message.includes('duplicate key value violates unique constraint')) {
                    throw new common_1.ConflictException('Unique key constraint violation');
                }
                throw new common_1.HttpException({
                    error: true,
                    statusCode: 400,
                    message: error.message,
                    data: [],
                }, 400);
            }
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
//# sourceMappingURL=transform.interceptor.js.map