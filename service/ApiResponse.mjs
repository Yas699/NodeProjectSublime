export class ApiResponse  {
    constructor(
        data,
        message
    )
    {
        this.success = true;
        this.data = data;
        this.message = message;
    }
}