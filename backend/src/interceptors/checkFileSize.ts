import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CheckFileSize implements PipeTransform {
  transform(value: any) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1024;
    return value.size < oneKb;
  }
}