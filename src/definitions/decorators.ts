//Decorator to handle try and catch
export function catchAsync(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        return result.catch(args[2]); // args[2] is `next` in Express middleware
    };
}
