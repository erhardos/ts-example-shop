const helper = {
    compose (fns: Function[]): Function {

        return result => {
        for (let i = fns.length - 1; i > -1; i--) {
            result = fns[i].call(this, result);
        }

        return result;
        };
    },

    identity<T>(arg: T): T {
        return arg;
    }
} 

export default helper;