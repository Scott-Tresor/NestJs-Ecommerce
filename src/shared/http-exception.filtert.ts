import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus } from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    /**
     * @param exception 
     * @param hotst 
     * @returns {json}
     * @author scott-Tresor <scotttresor@gmail.com>
     */
    catch(exception: HttpException, hotst: ArgumentsHost){
        const ctx = hotst.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: status !== HttpStatus.INTERNAL_SERVER_ERROR ? 
            (exception.message.error || exception.message) 
            || null : 'Internal server error'
        };
        return response.status(status).json(errorResponse);
    }
}