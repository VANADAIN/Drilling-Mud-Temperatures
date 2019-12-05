function calculator() {


    // getter part

    console.log("start")

    let consumption = document.getElementById('consumption').value
    let Q = Number(consumption)
    console.log(Q)

    let diameter = document.getElementById('diameter').value
    let D = Number(diameter)
    console.log(D)

    let depth = document.getElementById('depth').value
    let H = Number(depth)
    console.log(H)
    let outer_d = document.getElementById('outer_d').value
    let D1 = Number(outer_d)
    console.log(D1)
    let inner_d = document.getElementById('inner_d').value
    let D2 = Number(inner_d)
    console.log(D2)
    let hydro_shaggily = document.getElementById('hydro_shaggily').value
    let K = Number(hydro_shaggily)
    console.log(K)
    let connection_type = document.getElementById('connection').value
    let J = Number(connection_type)
    console.log(J)
    let channel_d = document.getElementById('channel_d').value
    let D3 = Number(channel_d)
    console.log(D3)
    let length = document.getElementById('length').value
    let L = Number(length)
    console.log(L)
    let liquid_type = document.getElementById('liquid_type').value
    let J1 = Number(liquid_type)
    console.log(J1)
    let density = document.getElementById('density').value
    let R = Number(density)
    console.log(R)
    let structural = document.getElementById('structural').value
    let N = Number(structural)
    console.log(N)
    let dynamical = document.getElementById('dynamical').value
    let T = Number(dynamical)
    console.log(T)
    let dynamical_2 = document.getElementById('dynamical_2').value
    let M = Number(dynamical_2)
    console.log(M)
    console.log('Getting inputs')

    let ud_tepl = document.getElementById('ud_tepl').value
    let C1 = Number(ud_tepl)
    console.log(C1)
    let kof_tepl = document.getElementById('kof_tepl').value
    let L1 = Number(kof_tepl)
    console.log(L1)
    let rock_density = document.getElementById('rock_density').value
    let R2 = Number(rock_density)
    console.log(R2)
    let thermal_capacity = document.getElementById('thermal_capacity').value
    let C2 = Number(thermal_capacity)
    console.log(C2)
    let thermal_conductivity = document.getElementById('thermal_conductivity').value
    let L2 = Number(thermal_conductivity)
    console.log(L2)
    let temperature_rock = document.getElementById('temperature').value
    let T0 = Number(temperature_rock)
    console.log(T0)
    let gradient = document.getElementById('gradient').value
    let S = Number(gradient)
    console.log(S)
    let bt = document.getElementById('bt').value
    let L0 = Number(bt)
    console.log(L0)
    let start_temperature = document.getElementById('start_temperature').value
    let T1 = Number(start_temperature)
    console.log(T1)
    let spending = document.getElementById('spending').value
    let N3 = Number(spending)
    console.log(N3)
    let circulation = document.getElementById('circulation').value
    let T2 = Number(circulation)
    console.log(T2)
    let depth_step = document.getElementById('depth_step').value
    let H1 = Number(depth_step)
    console.log(H1)
    let frequency = document.getElementById('frequency').value
    let N1 = Number(frequency)
    console.log(N1)
    //calculation part

    let Pi = 3.1415926

    // множитель для коэффициента борда и карно 
    if (J == 1) {
        var a = 2
    } else if (J == 2) {
        var a = 1.5
    } else if (J == 3) {
        var a = 0
    } else {
        var a = 0
    }
    console.log(J)
    //угловая скорость
    let U = Pi * D1 * (N1/60)
    // сечение внутри труб
    let F1 = Pi*(D2**2)/4
    // Коэф борда и карно
    let E = a*( ( ((D2/D3)**2) - 1 )**2)
    // Массовый расход
    let G = Q* (R/60000)
    // сечение внутри кольца
    let F2 = Pi* ((D2**2)-(D1**2))/4

    console.log(U)
    console.log(F1)
    console.log(E)
    console.log(G)
    // Reynolds part 

    // скорость потока
    let V = Q/(60000*F1)

    
    // вязкость бингамовской жидкости
    let m = N + 0.17*T*(D2/V)
    console.log("v =" + V)
    console.log("D2 =" + D2)

    console.log("R/m =" + R/m)
    // reynolds
    let R1 = V*D2*(R/m)
    // прандтль
    let P = m * (C1/L1)
    
    console.log("checkpoint1")
    console.log(V)
    console.log(m)
    console.log(R1)
    console.log(P)

    // теплоотдача
    if (J == 1) {

        if (R1 > 2400) {
            var A0 = 0.021*(R1**0.8)*(P**0.43) * (L1/D2)
        } else {
            var A0 = 0.15*(R1**0.33)*(P**0.43) * (L1/D2)
        }

    } else {

        if (R1 > 2400) {
            var A0 = 0.023*(R1**0.8)*(P**0.43) * (L1/D2)
        } else {
            var A0 = 0.12*(R1**0.33)*(P**0.43) * (L1/D2)
        }

    }
    console.log(A0)
    // гидравлическое сопротивление

    if (J == 1) {

        var W = 0.1*( (1.46 * (K/D2) + (100/R1))**0.25 )

    } else {

        if (R1 > 2400) {
            var W = (0.0075/(R1**0.125))
        } else if (R1 > 50000) {
            var W = 0.02
        } else {
            var W = 64/R1
        }

    }
    console.log(W)
    // потери по длине 
    let P1 = W*(V**2)*R*(H/2*D2)
    // кол-во труб
    let N4 = H/L
    // потери давления в соединениях
    let P2 = E*(V**2)*R*(N4/2)
    // гидравлический уклон
    let I1 = ((P1+P2)/(9.81*R*H)) 

    let D4 = D - D1

    console.log(P1)
    console.log(P2)
    console.log(N4)
    console.log(D4)
    console.log("checkpoint2")

    //  lambda part 

    if (J == 1) {

        var W1 = (0.3164/(R1**0.25))

    } else {

        if (R1 <= 1200) {
            var W1 = (14.6/(R1**0.9))
        }   else {
            var W1 = (0.075/(R1**0.125))
        }

    }
    console.log(W1)

    // потери в кольцевом пространстве
    let P3 = W * (V**2) * R * 1.03 * (H/(2*D4))
    // гидр уклон
    let I2  = (P3/ (9.81*R* 1.03* H))

    // коэф теплопередачи через стенку трубы
    let log = (Math.log(D1/D2)/Math.log(10))
    let K1 = (1/ ( 1/(A0*D1) + 0.5*(log/L0)+(1/(A0*D1)) ) )
    console.log(K1)
    // критерий био
    let B1 = A0* (D/(2*L2))
    // температуропроводность
    let A3 = L2/(C2*R2)
    // kryteri furie
    let F3 = A3*T2*(4/(D**2))
    // koef nestacionarnogo teploobmena
    let K2 = A0/(1+B1*(F3**0.25))
    // pryrost t na zaboe
    let T3 = N3/(G*C1)
    // koefs
    let X = K2*(D/2)
    let X1 = ( (K**2)*((D**2)/4) + K2*K1*D )**0.5
    let X2 = Pi/(G*C1)

    let X4 = K1*X2

    let R3 = X2*(X + X1)
    let R4 = X2*(X - X1)

    let A4 = (1/X4) * ( S - 9.81 * (T1/C1) )
    let B = 9.81 * G * (T1 + I2)/(K2*Pi*D)

    console.log(K2)
    console.log(X1)
    console.log("R3*h = " + R3*H)
    console.log("R3 = " + R3)
    

    let X5 = (R3 * ( 2.718**(R3*H) ) ) - (R4 * ( 2.718**(R4*H) ))
    let X6 = T1 - T0 + A4 - B

    console.log(X5)

    let M1 = -(X6*R4*(2.718**(R4*H)) + X4*(A4-T3))/X5
    let M2 = (X6*R3*(2.718**(R4*H)) + X4*(A4-T3)*(R3/R4))/X5

    let Q1 = (X6*R3*(2.718**(R3*H)) + X4*(A4-T3))/X5
    let Q2 = -(X6*R3*(2.718**(R4*H)) + X4*(A4-T3)*(R3/R4))/X5

    console.log("checkpoint")
    console.log(M1)
    console.log(M2)

    console.log(R3)
    console.log(Q1)
    console.log(B)
    console.log(A4)
    console.log(T0)

    console.log("calculating temps")
    console.log(H)
    console.log(H1)
    console.log(H+H1)

    //final temperatures
    var T4 = [] 
    var T5 = [] 
    var T6 = [] 

    for (var i = 0; i < H; i = i + H1) {
        
        var t4 = (M1 * (2.718**(R3*i))) + (Q1*(2.718**(R4*i))) - A4 + B + T0 + S*i 
        t4.toFixed(2)
        T4.push(t4)
        
        var t5 = (M2 * 2.718**(R3*i)) + (Q1*2.718**(R4*i)) + B + T0 + S*i 
        t5.toFixed(2)
        T5.push(t5)

        var t6 = T0 + S*i
        t6.toFixed(2)
        T6.push(t6)

    }

    console.log(T4)
    console.log(T5)
    console.log(T6)

}