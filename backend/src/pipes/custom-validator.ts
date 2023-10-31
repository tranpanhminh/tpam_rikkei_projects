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

export function IsStringHigherThanZero(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isExpiryDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const parseValue = Number(value);
          return parseValue >= 0;
        },
      },
    });
  };
}

export function FilesLengthMustBeFour(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [1000000, 4], // Đặt các ràng buộc tại đây
      validator: {
        validate(files: any[], args: ValidationArguments) {
          const maxSize = args.constraints[0];
          const maxCount = args.constraints[1];

          if (!files) {
            return false;
          }

          // Kiểm tra số lượng tệp tin
          if (files.length !== maxCount) {
            return false;
          }

          for (const file of files) {
            if (file.size > maxSize) {
              return false;
            }
          }

          return true;
        },
      },
    });
  };
}

export function IsImage(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any) {
          if (!value || !Array.isArray(value)) {
            return false; // Handle cases where value is not an array or is empty
          }

          for (let i = 0; i < value.length; i++) {
            if (value[i].fileType && value[i].fileType.mime.includes('image')) {
              return true;
            }
          }

          return false;
        },
      },
    });
  };
}

export function CheckEachFileSize(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any) {
          console.log(value, 'VALE');
          if (!value || !Array.isArray(value)) {
            return false; // Handle cases where value is not an array or is empty
          }

          for (let i = 0; i < value.length; i++) {
            if (value[i] && value[i].size < 10000000) {
              return true;
            }
          }
          return false;
        },
      },
    });
  };
}

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

export function IsNotTheSame(
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
          return value !== relatedValue;
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

export function CheckRatingMinMax(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(rating: string) {
          if (Number(rating) < 0 || Number(rating) > 5) {
            return false;
          }
          return true;
        },
      },
    });
  };
}
