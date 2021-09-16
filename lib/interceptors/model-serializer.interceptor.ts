import { Injectable, NestInterceptor, ExecutionContext, CallHandler,} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from '../orm';
import { SimplePaginator } from '../paginators';

export interface Response<T> {
    data: T
}

@Injectable()
export class ModelSerializerInterceptor<T> implements NestInterceptor <T, Response<T> > {
    intercept(context: ExecutionContext,next: CallHandler,): Observable<Response<T> > {
        return next.handle().pipe(map(data => {
            return this.serialize(data, context)
        }));
    }

    /**
     * Serialize incoming response data
     */
    serialize(data: any, ctx: ExecutionContext) {
        const isObject = data !== null && typeof data === 'object';
        const isArray = Array.isArray(data);

        if (!isObject && !isArray) {
            return data;
        }

        return isArray ? data.map((item: any) => this.transformToPlain(item, ctx) )
            : this.transformToPlain(data, ctx)
    }

    /**
     * Transform data into a jsonable format,
     * also hide or remove the hidden fields if data is instance of model
     */
    transformToPlain(data: any, ctx?: ExecutionContext) {
        // if (data instanceof Model) {
        //     console.log(data)
        //     return data.serialize()
        // }

        if (data instanceof SimplePaginator) {
            return data.toResponse();
        }

        return this.deepCheck(data);
    }

    /** Dont know how to named this method */
    deepCheck(data: any) {
        for (const [key, value] of Object.entries(data)) {
            if (value instanceof Model) {
                data[key] = this.transformToPlain(value)
            }

            if (Array.isArray(value)) {
                data[key] = value.map(v => this.transformToPlain(v))
            }
        }

        if (data instanceof Model) {
            return data.serialize()
        }

        return data;
    }
}