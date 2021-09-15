type WhereDateOperator = '=' | '!='

export interface WhereDateOptions {
    operator?: WhereDateOperator;
    value?: any;
    timezone?: string;
}

export interface WhereDateBetweenOptions {
    equal?: boolean;
    value?: any[];
    timezone?: string;
}