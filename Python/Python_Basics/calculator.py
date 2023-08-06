#main get user input
def main():
    while True:
        user_input = input("Enter a operator (* + / -) for calculator or exit to close program: ")
        if user_input.lower() == 'exit':
            break
        else:
            if user_input == "+":
                x = int(input("Enter first number: "))
                y = int(input("Enter second number to add: "))
                result = add(x,y)
                print("Sum = ", result)
            if user_input == "*":
                x = int(input("Enter first number: "))
                y = int(input("Enter second number to multipy: "))
                result = mul(x,y)
                print("Product = ", result)
            if user_input == "/":
                x = int(input("Enter first number: "))
                y = int(input("Enter second number to divide: "))
                result = div(x,y)
                print("quotient = ", result)
            if user_input == "-":
                x = int(input("Enter first number: "))
                y = int(input("Enter second number to subtract: "))
                result = sub(x,y)
                print("difference = ", result)
                
#functions add, mult divide
    # take 2 inputs return solution
def add(x,y):
    return(x + y)
def mul(x,y):
    return(x * y)
def sub(x,y):
    return(x - y)
def div(x,y):
    return(x / y)

if __name__ == "__main__":
    main()


