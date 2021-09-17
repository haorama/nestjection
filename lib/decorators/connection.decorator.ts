import { Inject } from '@nestjs/common';
import { getConnectionToken } from '../utils';

export const InjectKnex = (name?: string): ParameterDecorator =>
  Inject(getConnectionToken(name));
