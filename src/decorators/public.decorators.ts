import { CustomDecorator, SetMetadata } from '@nestjs/common';

export declare const IS_PUBLIC_KEY = 'isPublic';

export const Public = (data: boolean = true): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC_KEY, data);
