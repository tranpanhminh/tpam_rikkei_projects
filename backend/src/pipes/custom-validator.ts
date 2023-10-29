import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

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

export function IsTheSame(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
      },
    });
  };
}

export function NotIncludeNumberAndSpecialCharacter(
  validationOptions?: ValidationOptions,
) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(full_name: string) {
          // Kiểm tra xem full_name không chứa số và không chứa "admin"
          if (!/^[a-zA-Z\s]*$/.test(full_name)) {
            return false;
          }
          return true;
        },
      },
    });
  };
}

export function NotIncludeAdminText(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(full_name: string) {
          if (/(admin)/i.test(full_name)) {
            // /(admin)/i để không phân biệt hoa thường
            return false;
          }
          return true;
        },
      },
    });
  };
}
