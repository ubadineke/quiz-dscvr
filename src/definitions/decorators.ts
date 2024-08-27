//Decorator to handle try and catch
// export function catchAsync(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//         const result = originalMethod.apply(this, args);
//         return result.catch(args[2]); // args[2] is `next` in Express middleware
//     };
// }

export function catchAsync(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        try {
            await originalMethod.apply(this, args);
        } catch (err) {
            const res = args[1]; // args[1] is `res` in Express middleware
            console.log(err);
            res.status(500).json({ error: err });
        }
    };
}
