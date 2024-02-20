
export interface Status{
    valid : Boolean,
    message? : string
}

type Rule = (value : string) => Status

export function length({ min, max }: { min: number, max: number }): Rule {
    return function (value: string): Status {
        const result = Boolean(value.length >= min && value.length <= max);
        return {
            valid: result,
            message: result ? undefined : `must be between ${min} and ${max}`
        };
    };
}

export const required : Rule = (value:string) : Status => {
    const result = Boolean(value)
    return{
        valid : result  ,
        message : result ? undefined : 'this feild is required'
    }
}

export function validate(value:string, rules : Rule[]) : Status{
    for(const rule of rules){
        const result =  rule(value)
        if(!result.valid){
            return result
        }
    }
    return {
        valid : true
    }
}

