import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentContext = createParamDecorator(
    async (_data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()?.context;
  })
