"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentContext = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentContext = (0, common_1.createParamDecorator)(async (_data, ctx) => {
    return ctx.switchToHttp().getRequest()?.context;
});
//# sourceMappingURL=user.decorator.js.map