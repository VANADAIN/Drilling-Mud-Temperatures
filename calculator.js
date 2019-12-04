function calculator() {


    // getter part

    let consumption = document.getElementById('consumption').value
    let Q = consumption

    let diameter = document.getElementById('diameter').value
    let D = diameter

    let depth = document.getElementById('depth').value
    let H = depth

    let outer_d = document.getElementById('outer_d').value
    let D1 = outer_d

    let inner_d = document.getElementById('inner_d').value
    let D2 = inner_d

    let hydro_shaggily = document.getElementById('hydro_shaggily').value
    let K = hydro_shaggily

    let connection_type = document.getElementById('connection').value
    let J = connection_type

    let channel_d = document.getElementById('channel_d').value
    let D3 = channel_d

    let length = document.getElementById('length').value
    let L = length

    let liquid_type = document.getElementById('liquid_type').value
    let J1 = liquid_type

    let density = document.getElementById('density').value
    let R = density

    let structural = document.getElementById('structural').value
    let N = structural

    let dynamical = document.getElementById('dynamical').value
    let T = dynamical

    let dynamical_2 = document.getElementById('dynamical_2').value
    let M = dynamical_2

    let ud_tepl = document.getElementById('ud_tepl').value
    let C1 = ud_tepl

    let kof_tepl = document.getElementById('kof_tepl').value
    let L1 = kof_tepl

    let rock_density = document.getElementById('rock_density').value
    let R2 = rock_density

    let thermal_capacity = document.getElementById('thermal_capacity').value
    let C2 = thermal_capacity

    let thermal_conductivity = document.getElementById('thermal_conductivity').value
    let L2 = thermal_conductivity

    let temperature_rock = document.getElementById('temperature').value
    let T0 = temperature_rock

    let gradient = document.getElementById('gradient').value
    let S = gradient

    let bt = document.getElementById('bt').value
    let L0 = bt

    let start_temperature = document.getElementById('start_temperature').value
    let T1 = start_temperature

    let spending = document.getElementById('spending').value
    let N3 = spending

    let circulation = document.getElementById('circulation').value
    let T2 = circulation

    let depth_step = document.getElementById('depth_step').value
    let H1 = depth_step

    let frequency = document.getElementById('frequency').value
    let N1 = frequency

    //calculation part

    let Pi = 3.1415926

    // множитель для коэффициента борда и карно 
    if (J == 1) {
        let a = 2
    } else if (J == 2) {
        let a = 1.5
    } else if (J == 3) {
        let a = 0
    } else {
        let a = 0
    }

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

    // Reynolds part 

    // скорость потока
    let V = Q/(60000*F)
    // вязкость бингамовской жидкости
    let M = N + 0.17*T*(D2/V)
    // reynolds
    let R1 = V*D2*(R/M)
    // прандтль
    let P = M * (C1/L1)

    // теплоотдача
    if (J == 1) {

        if (R1 > 2400) {
            let A0 = 0.021*(R1**0.8)*(P**0.43) * (L1/D2)
        } else {
            let A0 = 0.15*(R1**0.33)*(P**0.43) * (L1/D2)
        }

    } else {

        if (R1 > 2400) {
            let A0 = 0.023*(R1**0.8)*(P**0.43) * (L1/D2)
        } else {
            let A0 = 0.12*(R1**0.33)*(P**0.43) * (L1/D2)
        }

    }

    // гидравлическое сопротивление

    if (J == 1) {

        let W = 0.1*( (1.46 * (K/D2) + (100/R1))**0.25 )

    } else {

        if (R1 > 2400) {
            let W = (0.0075/(R1**0.125))
        } else if (R1 > 50000) {
            let W = 0.02
        } else {
            let W = 64/R1
        }

    }

    // потери по длине 
    let P1 = W*(V**2)*R*(H/2*D2)
    // кол-во труб
    let N4 = H/L
    // потери давления в соединениях
    let P2 = E*(V**2)*R*(N4/2)
    // гидравлический уклон
    let I1 = ((P1+P2)/(9.81*R*H)) 

    let D4 = D - D1


    //  lambda part 

    if (J == 1) {

        let W1 = (0.3164/(R1**0.25))

    } else {

        if (R1 <= 1200) {
            let W1 = (14.6/(R1**0.9))
        }   else {
            let W = (0.075/(R1**0.125))
        }

    }
    // потери в кольцевом пространстве
    let P3 = W * (V**2) * R * 1.03 * (H/(2*D4))
    // гидр уклон
    let I2  = (P3/ (9.81*R* 1.03* H))

    // коэф теплопередачи через стенку трубы
    let log = (Math.log(D1/D2)/Math.log(10))
    let K1 = (1/ ( 1/(A1*D1) + 0.5*(log/L0)+(1/(A2*D1)) ) )

    // критерий био
    let B1 = A2* (D/(2*L2))
    // температуропроводность
    let A3 = L2/(C2*R2)
    // kryteri furie
    let F3 = A3*T2*(4/(D**2))
    // koef nestacionarnogo teploobmena
    let K2 = A2/(1+B1*(F3**0.25))
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

}