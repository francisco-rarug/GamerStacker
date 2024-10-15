def calculadora(flag):

    numero_1 = int(input("Ingrese el primer numero: "))

    numero_2 = int(input("Ingrese el segundo numero: "))

    if flag == "suma":
        calculo = numero_1 + numero_2
    elif flag == "resta":
        calculo = numero_1 - numero_2
    elif flag == "multiplicaciones":
        calculo = numero_1 * numero_2
    elif flag == "division":
        if numero_2 == 0:
            print("-------------------------------------------------------")
            print("No se puede dividir por 0")
            print("-------------------------------------------------------")
        else:
            print("-------------------------------------------------------")
            calculo = numero_1 / numero_2
            print("el resultado de la {0} es {1}".format(flag, calculo))
            print("-------------------------------------------------------")
        

while True:
    
    opcion = int(input("Ingrese la operacion a realizar: "))

    match opcion:
        case 1:
            calculadora("suma")
        case 2:
            calculadora("resta")
        case 3:
            calculadora("multiplicacion")
        case 4:
            calculadora("division")
        case 5:
            print("hasta la proxima!")
            break
        case _:
            print("Esta operacion no existe")