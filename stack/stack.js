class Stack {
    constructor(data) {
        if (data) {
            if (Array.isArray(data)) {
                this.data = [].concat(data);
            } else {
                this.data = [];
                this.data.push(data);
            }
        } else {
            this.data = [];
        }
        this.top = this.data.length;
    }
    isEmpty() {
        return this.top === 0;
    }
    length() {
        return this.top;
    }
    peek() {
        return this.data[this.top - 1];
    }
    pop() {
        this.top = this.top - 1;
        return this.data.pop();
    }
    print() {
        this.data.map((val, idx) => console.log(idx, val));
    }
    push(element) {
        this.data[this.top] = element;
        this.top++;
    }
    reverse() {
        this.data = this.data.reduce((arr, val) => {
            arr.unshift(val);
            return arr;
        }, []);
    }
}

var data = [1, 2, 3];

const stack = new Stack(data);

stack.push(4);
stack.push('abc');
stack.reverse();

console.log(stack);
console.log(stack.isEmpty());
console.log(stack.length());
console.log(stack.peek());

