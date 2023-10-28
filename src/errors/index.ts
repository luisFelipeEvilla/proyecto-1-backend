export class ResourceAlreadyExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ResourceAlreadyExistsError";
        this.message = "Resource already exists";
    }
}

export class ResourceNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Resource NotFound";
        this.message = "Resource not found";
    }
}
