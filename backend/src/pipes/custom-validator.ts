import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCVV(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isCVV',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const cvvPattern = /^[0-9]{3}$/;
          return cvvPattern.test(value);
        },
      },
    });
  };
}

export function IsExpiryDate(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isExpiryDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Example pattern: MM/YY (e.g., 12/23)
          const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
          return expiryDatePattern.test(value);
        },
      },
    });
  };
}

// export function IsCouponExist(validationOptions?: ValidationOptions) {
//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       name: 'IsCouponExist',
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       validator: CouponExistRule,
//     });
//   };
// }
